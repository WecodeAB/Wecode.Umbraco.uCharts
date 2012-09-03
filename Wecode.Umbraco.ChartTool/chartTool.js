
//Globals
var chart;
var values;
google.load("visualization", "1", { packages: ["corechart"] });
google.setOnLoadCallback(initChart);

var array = [
            ['Year', 'Sales', 'Expenses'],
            ['2004', 1000, 400],
            ['2005', 1170, 460],
            ['2006', 660, 1120],
            ['2007', 1030, 540]
        ];

var options = {
    title: 'Company Performance',
    hAxis: { title: 'Year' },
    animation: { duration: 1000, easing: 'out' },
    chartArea: { left: 50, top: 50, width: "80%", height: "80%" },
    is3D: true
};

//Options methods
var setOptions = function (myOptions, render) {
    options = $.extend({}, options, myOptions);
    if(render){
        rerenderChart();
    }
};

var determineOption = function () {
    "use strict";
    var $this = $(this),
		key = $this.data("key"),
		newOption = {};
    
    newOption[key] = $this.is(":checked");

    setOptions(newOption, true);
};

var rerenderChart = function () {
    chooseChartType(false);
};

//chart methods
var initChart = function() {
    chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
};

var drawBarChart = function (chartTypeChanged) {

    if (chartTypeChanged == true) {
        chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    }
    var data = google.visualization.arrayToDataTable(array);
    chart.draw(data, options);

}

var drawColumnChart = function(chartTypeChanged) {

    if (chartTypeChanged == true) {
        chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    }
    var data = google.visualization.arrayToDataTable(array);
    chart.draw(data, options);

};

var drawLineChart = function(chartTypeChanged) {

    if (chartTypeChanged == true) {
        chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    }
    var data = google.visualization.arrayToDataTable(array);

    options.curveType = "none";
    chart.draw(data, options);
};

var drawCurveChart = function(chartTypeChanged) {

    if (chartTypeChanged == true) {
        chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    }
    var data = google.visualization.arrayToDataTable(array);

    options.curveType = "function";
    chart.draw(data, options);
};

var drawPieChart = function(chartTypeChanged) {

    if (chartTypeChanged == true) {
        chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    }
    var data = google.visualization.arrayToDataTable(array);
    chart.draw(data, options);

};

// helper methods
var formatChartData = function(array) {
    $.each(array, function(index, innerArray) {
        if (index > 0) {
            $.each(innerArray, function(index2, value) {
                if (index2 > 0 && index > 0) {
                    array[index][index2] = parseInt(value);
                }
            });
        }
        innerArray.splice(innerArray.length - 1, 1);
    });
    array.splice(array.length - 1, 1);
};

var chooseChartType = function(chartTypeChanged) {
    if ($("input[name='chart']:checked").val() == 'column') {
        drawColumnChart(chartTypeChanged);
    } else if ($("input[name='chart']:checked").val() == 'pie') {
        drawPieChart(chartTypeChanged);
    } else if ($("input[name='chart']:checked").val() == 'bar') {
        drawBarChart(chartTypeChanged);
    } else if ($("input[name='chart']:checked").val() == 'pie') {
        drawPieChart(chartTypeChanged);
    } else if ($("input[name='chart']:checked").val() == 'curve') {
        drawCurveChart(chartTypeChanged);
    } else {
        drawLineChart(chartTypeChanged);
    }
};


var updateArray = function (save) {
    var $container = $("#dataTable");
    var handsontable = $container.data('handsontable');
    array = handsontable.getData();
    formatChartData(array);
    values.array = array;

    if (save) {
        updateHiddenField();
    }

};

var updateHAxis = function (save) {
    values.hAxisTitle = array[0][0];
    options.hAxis.title = values.hAxisTitle;
    
    if (save) {
        updateHiddenField();
    }
}; 

var updateTitle = function (save) {
    values.title = $("#chartTitle").val();
    options.title = values.title;

    if (save) {
        updateHiddenField();
    }
};

var updateValues = function (save) {
    values.chartType = $("input[name='chart']:checked").val();
    values.is3D = $("#is3D").prop("checked");
    values.width = $("#widthHidden").val();
    values.height = $("#heightHidden").val();

    if (save) {
        updateHiddenField();
    }
};

var updateAll = function () {

    updateArray();

    updateTitle();

    updateValues();

    chooseChartType(false);

    updateHiddenField();

};

var updateHiddenField = function() {
    $("#javaScriptArrayHidden").val(JSON.stringify(values));
};


$(function () {

    //Init
    if ($("#javaScriptArrayHidden").val() != "") {

        values = $.parseJSON($("#javaScriptArrayHidden").val());

        if (values.array != undefined && values.array.length > 0) {
            array = values.array;
        }

        if (values.HAxisTitle != undefined) {
            options.hAxis.title = values.hAxisTitle;
        }

        if (values.title != undefined || values.title != "") {
            $("#chartTitle").val(values.title);
            options.title = values.title;

        } else {
            $("#chartTitle").val("");
            options.title = "";
        }

        if (values.is3D != undefined) {
            $("#is3D").prop("checked", values.is3D);
        }
        if (values.chartType != undefined) {
            $("#" + values.chartType).prop("checked", true);
        }

        chooseChartType(true);
    }

    $("#dataTable").handsontable({
        rows: 5,
        cols: 3,
        minSpareCols: 1, //always keep at least 1 spare row at the right
        minSpareRows: 1, //always keep at least 1 spare row at the bottom
        onChange: function (data, source) {
            if (source === 'loadData') {
                return;
            }
            //Update Chart when editing table
            updateArray(false);
            updateHAxis(true);
            chooseChartType(false);
        }
    });

    $("#dataTable").handsontable("loadData", array);
    


    $("input.checkboxes").click(function () {
        updateValues(true);
        determineOption();
    });

  

    $("#chartTitle").blur(function () {
        updateTitle(true);
        chooseChartType(false);

    });

    //    $("#saveButton").click(function () {

    //        updateChartAndValues();
    //    });

    $("input[name='chart']:radio").change(function () {
        updateValues(true);
        chooseChartType(true);

    });



});