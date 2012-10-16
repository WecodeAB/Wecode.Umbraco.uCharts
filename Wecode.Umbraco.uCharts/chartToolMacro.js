     
google.load("visualization", "1", { packages: ["corechart"] });


var setType = function (settings) {
    var key = settings.chartType;
    settings.options.curveType = key === "Curve" ? "function" : "none";
    key = key === "Curve" ? "Line" : key;
    settings.chartType = key;
    
};

var renderGoogleChart = function (settings, chartDivId) {

    setType(settings);

    var googleChart = new google.visualization[settings.chartType + "Chart"]($('#' + chartDivId)[0]);

    googleChart.draw(google.visualization.arrayToDataTable(settings.data), settings.options);
};

        