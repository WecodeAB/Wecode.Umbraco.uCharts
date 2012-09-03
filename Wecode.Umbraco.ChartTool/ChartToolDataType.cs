using System;
using umbraco.cms.businesslogic.datatype;

namespace Wecode.Umbraco.ChartTool
{
    public class ChartToolDataType : AbstractDataEditor
    {
        private readonly ChartToolEditor _control = new ChartToolEditor();

        #region DataEditorSettings

        [DataEditorSetting("<img src='/umbraco/plugins/Wecode.Umbraco.ChartTool/chart_column.png' alt='Column Chart'/> Column Chart",
            description = "Uncheck top disable column chart",
            defaultValue = true,
            type = typeof(umbraco.editorControls.SettingControls.CheckBox))]
        public string EnableColumnChart { get; set; }
        
        [DataEditorSetting("<img src='/umbraco/plugins/Wecode.Umbraco.ChartTool/chart_bar.png' alt='Bar Chart'/> Bar Chart", 
            description = "Uncheck top disable bar chart",
            defaultValue = true, 
            type = typeof(umbraco.editorControls.SettingControls.CheckBox))]
        public string EnableBarChart { get; set; }

        [DataEditorSetting("<img src='/umbraco/plugins/Wecode.Umbraco.ChartTool/chart_line.png' alt='Line Chart'/> Line Chart", 
            description = "Uncheck top disable line chart", 
            defaultValue = true, 
            type = typeof(umbraco.editorControls.SettingControls.CheckBox))]
        public string EnableLineChart { get; set; }

        [DataEditorSetting("<img src='/umbraco/plugins/Wecode.Umbraco.ChartTool/chart_curve.png' alt='Curve Chart'/> Curve Chart", 
            description = "Uncheck top disable curve chart", 
            defaultValue = true, 
            type = typeof(umbraco.editorControls.SettingControls.CheckBox))]
        public string EnableCurveChart { get; set; }

        [DataEditorSetting("<img src='/umbraco/plugins/Wecode.Umbraco.ChartTool/chart_pie.png' alt='Pie Chart'/> Pie Chart", 
            description = "Uncheck top disable pie chart", 
            defaultValue = true, 
            type = typeof(umbraco.editorControls.SettingControls.CheckBox))]
        public string EnablePieChart { get; set; }

        //[DataEditorSetting("Grid Lines", 
        //    description = "Uncheck top disable grid", 
        //    defaultValue = true, 
        //    type = typeof(umbraco.editorControls.SettingControls.CheckBox))]
        //public string EnableGridLines { get; set; }

        [DataEditorSetting("Title", 
            description = "Uncheck top disable chart title", 
            defaultValue = true, 
            type = typeof(umbraco.editorControls.SettingControls.CheckBox))]
        public string EnableChartTitle { get; set; }

        [DataEditorSetting("Set Chart Width", 
            description = "If you need to control the width of the charts specify it here in pixels.", 
            type = typeof(umbraco.editorControls.SettingControls.TextField))]
        public string ChartWidth { get; set; }

        [DataEditorSetting("Set Chart Height", 
            description = "If you need to control the height of the charts specify it here in pixels.", 
            type = typeof(umbraco.editorControls.SettingControls.TextField))]
        public string ChartHeight { get; set; }

        #endregion

        // Set ID, needs to be unique
        public override Guid Id
        {
            get
            {
                return new Guid("1BA9853C-8772-43A8-937B-E865B21DFDDA");
            }
        }

        //Set name, (is what appears in data editor dropdown)
        public override string DataTypeName
        {
            get
            {
                return "Chart Tool";
            }
        }


        public ChartToolDataType()
        {
            //set rendercontrol
            base.RenderControl = _control;
            //init event
            _control.Init += ControlInit;
            //save event
            base.DataEditorControl.OnSave += DataEditorControl_OnSave;

        }

        void ControlInit(object sender, EventArgs e)
        {
            bool flag;

            _control.EnableColumnChart = !bool.TryParse(EnableColumnChart, out flag) || flag;
            _control.EnableBarChart = !bool.TryParse(EnableBarChart, out flag) || flag;
            _control.EnableChartTitle = !bool.TryParse(EnableChartTitle, out flag) || flag;
            _control.EnableCurveChart = !bool.TryParse(EnableCurveChart, out flag) || flag;
            //_control.EnableGridLines = !bool.TryParse(EnableGridLines, out flag) || flag;
            _control.EnableLineChart = !bool.TryParse(EnableLineChart, out flag) || flag;
            _control.EnablePieChart = !bool.TryParse(EnablePieChart, out flag) || flag;

            var testInt = -1;

            _control.ChartHeight = int.TryParse(ChartHeight, out testInt) ? testInt : -1;
            _control.ChartWidth = int.TryParse(ChartWidth, out testInt) ? testInt : -1;
           
            _control.Value = base.Data.Value != null ? base.Data.Value.ToString() : "";
           
        }

        void DataEditorControl_OnSave(EventArgs e)
        {
            base.Data.Value = _control.Value;
            //throw new Exception("Trying to save. Value is:" + _control.value);
        }
    }
}