using System;
using System.Web.UI;
using System.Web.UI.WebControls;
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


            _control.OptionControls = new ControlCollection(_control);

            /*AddOptionsControl("Chart Height", "ChartHeight", "chartHeight", new TextBox(), _control.OptionControls);
            AddOptionsControl("Chart Width", "ChartWidth", "chartWidth", new TextBox(), _control.OptionControls);
            AddOptionsControl("Background Color", "BackgroundColorFill", "backgroundColor.fill", new TextBox(), _control.OptionControls);
            AddOptionsControl("Frame Width", "BackgroundColorStrokeWidth", "backgroundColor.strokeWidth", new TextBox(), _control.OptionControls);
            AddOptionsControl("Frame Color", "BackgroundColorStroke", "backgroundColor.stroke", new TextBox(), _control.OptionControls);
            AddOptionsControl("Legend position", "LegendPosition", "legend.position", new TextBox(), _control.OptionControls);
            AddOptionsControl("Is 3D", "Is3D", "is3D", new CheckBox(), _control.OptionControls);*/


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
           
            _control.EditorValue = base.Data.Value != null ? base.Data.Value.ToString() : ""; 
           
        }

        private void AddOptionsControl(string labelText, string id, string dataKey, Control control, ControlCollection controlCollection)
        {
            var label = new Label { Text = labelText, AssociatedControlID = id };

            control.ID = id;
            control.ClientIDMode = ClientIDMode.Static;

            if (control is TextBox)
            {
                ((TextBox) control).CssClass = "chartSetting";
                ((TextBox)control).Attributes.Add("data-key", dataKey);
            }
            else if (control is CheckBox)
            {
                ((CheckBox) control).CssClass = "chartSetting";
                ((CheckBox) control).Attributes.Add("data-key", dataKey);
            }
           
            controlCollection.Add(label);
            controlCollection.Add(control);
        }

        void DataEditorControl_OnSave(EventArgs e)
        {
            base.Data.Value = _control.EditorValue;
            //throw new Exception("Trying to save. Value is:" + _control.value);
        }
    }
}