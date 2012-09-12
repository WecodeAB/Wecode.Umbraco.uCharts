(function (window, $) {
    "use strict";
    var chart, chartHandler;

    window.chart = chart = (function () {
        var setOptions = function () {
            var $this = $(this),
				value;
            var key = $this.data("key");

            if (key === null || key === undefined) {
                return;
            }

            key = key.replace(/\s/g, "");
            var keys = key.split(/,/g);

            value = getValueFromElement.call(this);
            updateOptions(keys, value);
            $("#javaScriptArrayHidden").val(JSON.stringify(chart.settings));
            chartHandler.updateChart();

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

        var updateOptions = function (keys, value) {
            $.each(keys, function () {
                if (!keys || !keys.length) {
                    return;
                }

                if (!/\./g.test(this)) {
                    chart.settings.options[this] = value;
                }
                else {
                    var arrayKey = this.split(/\./g),
						obj;

                    $.each(arrayKey, function (i) {
                        if (!i) {
                            obj = chart.settings.options[this];
                            if (!obj) {
                                obj = chart.settings.options[this] = {};
                            }
                            return true;
                        }
                        else if (i === arrayKey.length - 1) {
                            obj[this] = value;
                            if (!obj) {
                                obj = chart.settings.options[this] = {};
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

        var setData = function () {
            var handsonTable = $("#dataTable").data("handsontable");

            chart.settings.data = formatChartData(handsonTable.getData());

            $("#javaScriptArrayHidden").val(JSON.stringify(chart.settings));

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
            setOptions: setOptions,
            setData: setData
        };
    })();

    chart.settings = {
        data: [
				["", "Sales", "Expenses"],
				["2004", 1000, 400],
				["2005", 1170, 460],
				["2006", 660, 1120],
				["2007", 1030, 540]
			],
        options: {
            title: "Chart Title",
            legend: {
                 position : "bottom"
            },
            hAxis: {
                title: "X-axis title"
            },
            animation: {
                duration: 1000,
                easing: "out"
            },
            chartArea: {
                left: 50,
                top: 50,
                width: "80%",
                height: "70%"
            }
            
        },
        chartType: "Column"
    };

    window.chartHandler = chartHandler = (function () {
        var googleChart;
        google.load("visualization", "1", { packages: ["corechart"] });
        google.setOnLoadCallback(function () {
            googleChart = new google.visualization.ColumnChart($('#chart_div')[0]);
        });

        var redrawChart = function () {
            render(true);
        };

        var updateChart = function () {
            render(false);
        };

        var redrawOrUpdate = function () {
            var key = $(this).data("key");
            chart.settings.options.curveType = key === "Curve" ? "function" : "none";
            key = key === "Curve" ? "Line" : key;
            chart.settings.chartType = key;
            $("#javaScriptArrayHidden").val(JSON.stringify(chart.settings));
            render(true);
        };

        var render = function (doRedraw) {
            if (doRedraw) {
                googleChart = new google.visualization[chart.settings.chartType + "Chart"]($('#chart_div')[0]);
            }
            googleChart.draw(google.visualization.arrayToDataTable(chart.settings.data), chart.settings.options);
        };

        return {
            redrawChart: redrawChart,
            updateChart: updateChart,
            redrawOrUpdate: redrawOrUpdate
        };
    })();

    $(function () {
        if ($("#javaScriptArrayHidden").val() != null && $("#javaScriptArrayHidden").val() != "") {
            chart.settings = $.parseJSON($("#javaScriptArrayHidden").val());
        }

        var $dataTable = $("#dataTable");

        $(window).on("change", ".chartSetting", chart.setOptions);
        $(window).on("change", ".chartChooser", chartHandler.redrawOrUpdate);

        $(".chartChooser").each(function () {
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

            chartHandler.redrawChart();
        });

        $(".chartSetting").each(function () {
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

        $dataTable.handsontable({
            rows: 5,
            cols: 3,
            minSpareCols: 1,
            minSpareRows: 1,
            onChange: function (data, source) {
                if (source === 'loadData') {
                    return;
                }

                chart.setData(true);
                chartHandler.updateChart();

            }
        });

        $dataTable.handsontable("loadData", chart.settings.data);
    });
}).call(this, window, jQuery);