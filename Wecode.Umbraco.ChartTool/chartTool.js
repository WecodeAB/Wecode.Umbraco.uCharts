
//Globals
var settings = settings || { data: [], options: {} };

settings.data = [
            ['Year', 'Sales', 'Expenses'],
            ['2004', 1000, 400],
            ['2005', 1170, 460],
            ['2006', 660, 1120],
            ['2007', 1030, 540]
        ];

settings.options = {
    title: 'Chart Title',
    hAxis: { title: 'X-axis title' },
    animation: { duration: 1000, easing: 'out' },
    chartArea: { left: 50, top: 50, width: "80%", height: "70%" },
    is3D: true
};

//Options methods
var setOptions = function (myOptions, render) {
    settings.options = $.extend({}, settings.options, myOptions);
    if (render) {
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

//Update methods
var updateData = function (save) {
    var $container = $("#dataTable");
    var handsontable = $container.data('handsontable');
    settings.data = formatChartData(handsontable.getData());

    if (save) {
        updateHiddenField();
    }

};

var updateHAxis = function (save) {
    settings.options.hAxis.title = settings.data[0][0];
    if (save) {
        updateHiddenField();
    }
};

var updateTitle = function (save) {
    settings.options.title = $("#chartTitle").val();
    if (save) {
        updateHiddenField();
    }
};

var updateValues = function (save) {
    settings.chartType = $("input[name='chart']:checked").val();
    settings.options.is3D = $("#is3D").prop("checked");
    settings.width = $("#widthHidden").val();
    settings.height = $("#heightHidden").val();

    if (save) {
        updateHiddenField();
    }
};

var updateAll = function () {

    updateData();

    updateTitle();

    updateValues();

    chooseChartType(false);

    updateHiddenField();

};

var updateHiddenField = function () {

    $("#javaScriptArrayHidden").val(JSON.stringify(settings));

};


$(function () {

    //Init
    if ($("#javaScriptArrayHidden").val() != "") {

        settings = $.parseJSON($("#javaScriptArrayHidden").val());

        if (settings.options != undefined) {
            if (settings.options.title != undefined || settings.options.title != "") {
                $("#chartTitle").val(settings.options.title);
            } else {
                $("#chartTitle").val("");
            }

            if (settings.options.is3D != undefined) {
                $("#is3D").prop("checked", settings.options.is3D);
            }
        }

        if (settings.chartType != undefined) {
            $("#" + settings.chartType).prop("checked", true);
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
            updateData(false);
            updateHAxis(true);
            chooseChartType(false);
        }
    });

    $("#dataTable").handsontable("loadData", settings.data);

    $("input.checkboxes").click(function () {
        updateValues(true);
        determineOption();
    });

    $("#chartTitle").blur(function () {
        updateTitle(true);
        chooseChartType(false);

    });
   
    $("input[name='chart']:radio").change(function () {
        updateValues(true);
        chooseChartType(true);

    });

});