var chart;

google.load("visualization", "1", { packages: ["corechart"] });
google.setOnLoadCallback(initChart);

//chart methods
var initChart = function () {
    chart = new google.visualization.ColumnChart($('#chart_div')[0]);
};

var drawBarChart = function (chartTypeChanged) {

    if (chartTypeChanged == true) {
        chart = new google.visualization.BarChart($('#chart_div')[0]);
    }
    var data = google.visualization.arrayToDataTable(settings.data);
    chart.draw(data, settings.options);

};

var drawColumnChart = function (chartTypeChanged) {

    if (chartTypeChanged == true) {
        chart = new google.visualization.ColumnChart($('#chart_div')[0]);
    }
    var data = google.visualization.arrayToDataTable(settings.data);
    chart.draw(data, settings.options);

};

var drawLineChart = function (chartTypeChanged) {

    if (chartTypeChanged == true) {
        chart = new google.visualization.LineChart($('#chart_div')[0]);
    }
    var data = google.visualization.arrayToDataTable(settings.data);

    settings.options.curveType = "none";
    chart.draw(data, settings.options);
};

var drawCurveChart = function (chartTypeChanged) {

    if (chartTypeChanged == true) {
        chart = new google.visualization.LineChart($('#chart_div')[0]);
    }
    var data = google.visualization.arrayToDataTable(settings.data);

    settings.options.curveType = "function";
    chart.draw(data, settings.options);
};

var drawPieChart = function (chartTypeChanged) {

    if (chartTypeChanged == true) {
        chart = new google.visualization.PieChart($('#chart_div')[0]);
    }
    var data = google.visualization.arrayToDataTable(settings.data);
    chart.draw(data, settings.options);

};

// helper methods
var formatChartData = function (array) {
    $.each(array, function (index, innerArray) {
        if (index > 0) {
            $.each(innerArray, function (index2, value) {
                if (index2 > 0 && index > 0) {
                    array[index][index2] = parseInt(value);
                }
            });
        }
        innerArray.splice(innerArray.length - 1, 1);
    });
    array.splice(array.length - 1, 1);

    return array;
};

var chooseChartType = function (chartTypeChanged) {

    switch (settings.chartType) {
        case "column":
            drawColumnChart(chartTypeChanged);
            break;
        case "pie":
            drawPieChart(chartTypeChanged);
            break;
        case "bar":
            drawBarChart(chartTypeChanged);
            break;
        case "curve":
            drawCurveChart(chartTypeChanged);
            break;
        default:
            drawLineChart(chartTypeChanged);
            break;
    }
};