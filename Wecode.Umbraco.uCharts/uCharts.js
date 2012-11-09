/**
 * Created with JetBrains WebStorm.
 * User: JalmerudN
 * Date: 2012-10-19
 * Time: 13:19
 * To change this template use File | Settings | File Templates.
 */
(function (window, $) {
    "use strict";
    var uChart, uChartDataHandler, uChartRenderHandler, uChartComponentHandler;

    window.uChart = uChart = (function () {

        function Chart(obj) {
            var key,
                value,
                defaults = {
                    colors:[
                        { color:'#C50017', visibleInLegend:true },
                        { color:'#F7911E', visibleInLegend:true },
                        { color:'#EF5205', visibleInLegend:true },
                        { color:'#7A2280', visibleInLegend:true },
                        { color:'#4C1D52', visibleInLegend:true },
                        { color:'#4655A5', visibleInLegend:true },
                        { color:'#3EB1CC', visibleInLegend:true },
                        { color:'#131C6B', visibleInLegend:true },
                        { color:'#BB3FC1', visibleInLegend:true },
                        { color:'#798EDF', visibleInLegend:true },
                        { color:'#6DE7F6', visibleInLegend:true },
                        { color:'#0F7BA2', visibleInLegend:true },
                        { color:'#F1002B', visibleInLegend:true },
                        { color:'#990002', visibleInLegend:true }
                    ],
                    settings:{
                        data:[
                            ["", "Sales", "Expenses"],
                            ["2004", 1000, 400],
                            ["2005", 1170, 460],
                            ["2006", 660, 1120],
                            ["2007", 1030, 540]
                        ],
                        options:{
                            title:"Chart Title",
                            legend:{
                                position:"bottom"
                            },
                            hAxis:{
                                title:"X-axis title"
                            },
                            animation:{
                                duration:1000,
                                easing:"out"
                            },
                            chartArea:{
                                left:50,
                                top:50,
                                width:"80%",
                                height:"70%"
                            },
                            series:this.colors,
                            slices:this.colors

                        },
                        chartType:"Column"
                    }
                };

            obj = $.extend(obj, defaults);

            for (key in obj) {
                value = obj[key];
                this[key] = value;
            }
        };
        return Chart;

    })();

    window.uChartDataHandler = uChartDataHandler = (function(){
        var updateOptions = function (keys, value, self) {
            $.each(keys, function () {
                if (!keys || !keys.length) {
                    return;
                }

                if (!/\./g.test(this)) {
                    self.settings.options[this] = value;
                }
                else {
                    var arrayKey = this.split(/\./g),
                        obj;

                    $.each(arrayKey, function (i) {
                        if (!i) {
                            obj = self.settings.options[this];
                            if (!obj) {
                                obj = self.settings.options[this] = {};
                            }
                            return true;
                        }
                        else if (i === arrayKey.length - 1) {
                            obj[this] = value;
                            if (!obj) {
                                obj = self.settings.options[this] = {};
                            }
                            return false;
                        }
                        if (!obj[this]) {
                            obj = obj[this] = {};
                            return true;
                        }
                        obj = obj[this];
                    });
                }
            });
        };


        var setOptions = function (control, chart) {
            var $control = $(control), value;
            var key = $control.data("key");

            if (key === null || key === undefined) {
                return;
            }
            key = key.replace(/\s/g, "");
            var keys = key.split(/,/g);

            value = getValueFromElement.call(control);
            updateOptions(keys, value, chart);

            $(chart.hiddenSettingsId).val(JSON.stringify(chart.settings));
            uChartRenderHandler.updateChart(chart);
        };


        var getValueFromElement = function () {
            switch (this.type) {
                case "text":
                    if (!/[^,\.\d\s]+/g.test(this.value)) {
                        return parseFloat(this.value);
                    }
                    return (this.value);
                case "checkbox":
                    return this.checked;
                case "radio":
                    return this.checked;
                default:
                    return;
            }
        };

        var setData = function (chart) {
            var handsonTable = $(chart.handsonTableId).data("handsontable");

            chart.settings.data = formatChartData(handsonTable.getData());

            $(chart.hiddenSettingsId).val(JSON.stringify(chart.settings));

        };

        var formatChartData = function (array) {
            $.each(array, function (i1) {
                if (i1 > 0) {
                    $.each(this, function (i2) {
                        if (i2 > 0 && i1 > 0) {
                            array[i1][i2] = parseFloat(this);
                        }
                    });
                }
                this.splice(this.length - 1, 1);
            });
            array.splice(array.length - 1, 1);

            return array;
        };

        return {
            setData: setData,
            setOptions: setOptions
        };

    })();

    window.uChartRenderHandler = uChartRenderHandler = (function () {
        var googleChart;
        google.load("visualization", "1", { packages: ["corechart"] });

        var redrawChart = function (chart) {
            render(chart, true);
        };

        var updateChart = function (chart) {
            render(chart, false);
        };

        var redrawOrUpdate = function (control, chart) {
            var key = $(control).data("key");
            chart.settings.options.curveType = key === "Curve" ? "function" : "none";
            key = key === "Curve" ? "Line" : key;
            chart.settings.chartType = key;
            $(chart.hiddenSettingsId).val(JSON.stringify(chart.settings));
            render(chart, true);
        };

        var render = function (chart, doRedraw) {
            if (doRedraw || googleChart == undefined) {
                googleChart = new google.visualization[chart.settings.chartType + "Chart"]($(chart.googleChartDivId)[0]);
            }
            googleChart.draw(google.visualization.arrayToDataTable(chart.settings.data), chart.settings.options);
        };

        return {
            redrawChart: redrawChart,
            updateChart: updateChart,
            redrawOrUpdate: redrawOrUpdate
        };
    })();

    window.uChartComponentHandler = uChartComponentHandler = (function(){

        var initHandsonTable = function(chart){
            var $dataTable = $(chart.handsonTableId);

            $dataTable.handsontable({
                rows: 5,
                cols: 3,
                minSpareCols: 1,
                minSpareRows: 1,
                onChange: function (data, source) {
                    if (source === 'loadData') {
                        return;
                    }

                    uChartDataHandler.setData(chart);
                    uChartRenderHandler.updateChart(chart);

                }
            });

            $dataTable.handsontable("loadData", chart.settings.data);
        };

        var initChartChooser = function(chart){

            $(chart.chartTypeClass).each(function () {
                var $this = $(this),
                    key = $this.data("key");

                if (key === null || key === undefined) {
                    return true;
                }

                if (chart.settings.chartType === null || chart.settings.chartType === undefined) {
                    return true;
                }

                if (key == chart.settings.chartType) {
                    $this.attr('checked', true);
                }

                uChartRenderHandler.redrawChart(chart);
            });
        };

        var initChartSettings = function(chart){
            $(chart.chartSettingsClass).each(function () {
                var $this = $(this),
                    key = $this.data("key");

                if (key === null || key === undefined) {
                    return true;
                }

                key = key.replace(/\s/g, "").split(/,/g)[0];

                if (!/\./g.test(key)) {
                    $this.val(chart.settings.options[key]);
                }
                else {
                    var arrayKey = key.split(/\./g),
                        obj = chart.settings.options;

                    $.each(arrayKey, function () {
                        if (obj) {
                            obj = obj[this];
                        }
                    });

                    if (obj) {
                        $this.val(obj);
                    }
                }
            });
        };


        var initUCharts = function (chart) {

            if ($(chart.hiddenSettingsId).val() != null && $(chart.hiddenSettingsId).val() != "") {
                chart.settings = $.parseJSON($(chart.hiddenSettingsId).val());
            } else {
                $(chart.hiddenSettingsId).val(JSON.stringify(chart.settings));
            }

            $(window).on("change", chart.chartSettingsClass, function(){uChartDataHandler.setOptions(this, chart)});
            $(window).on("change", chart.chartTypeClass, function(){ uChartRenderHandler.redrawOrUpdate(this, chart)});

            initHandsonTable(chart);
            initChartChooser(chart);
            initChartSettings(chart);
        };

        return {
            initUCharts: initUCharts
        };

    })();



}).call(this, window, jQuery);