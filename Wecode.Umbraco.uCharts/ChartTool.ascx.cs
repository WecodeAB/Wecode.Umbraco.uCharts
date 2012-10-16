using System;
using System.Globalization;
using System.Web.UI;
using umbraco.editorControls.userControlGrapper;

namespace Wecode.Umbraco.uCharts
{
    public partial class ChartTool : UserControl, IUsercontrolDataEditor, IChartEditor
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (!string.IsNullOrEmpty(_umbracoValue))
                javaScriptArrayHidden.Value = _umbracoValue;

            widthHidden.Value = ChartWidth.ToString(CultureInfo.InvariantCulture);
            heightHidden.Value = ChartHeight.ToString(CultureInfo.InvariantCulture);
            

            ToggleChartTypes();
            ToggleOptions();
            SetChartContainerValues();
            RenderOptionControls();

        }

        private void RenderOptionControls()
        {
            if (OptionControls != null)
            {
                foreach (Control optionControl in OptionControls)
                {
                    this.Controls.Add(optionControl);
                }
            }
        }

        private void SetChartContainerValues()
        {
            var styleString = string.Format("width: {0}px;height: {1}px;", 
                ChartWidth > 0 ? ChartWidth.ToString(CultureInfo.InvariantCulture) : "700",
                ChartHeight > 0 ? ChartHeight.ToString(CultureInfo.InvariantCulture) : "500");

            chart_div.Attributes.Add("style", styleString);
            //style="width: 700px;height: 200px; overflow: scroll"
        }

        private void ToggleOptions()
        {
            placeHolderChartTitle.Visible = EnableChartTitle;
            //placeHolderGridLines.Visible = EnableGridLines;
        }


        private void ToggleChartTypes()
        {
            placeHolderColumnChart.Visible = EnableColumnChart;
            placeHolderBarChart.Visible = EnableBarChart;
            placeHolderCurveChart.Visible = EnableCurveChart;
            placeHolderLineChart.Visible = EnableLineChart;
            placeHolderPieChart.Visible = EnablePieChart;
        }

        #region IUsercontrolDataEditor Members

        private string _umbracoValue;
        public object value
        {
            get
            {
                return javaScriptArrayHidden.Value;
            }
            set
            {
                if (value != null)
                    _umbracoValue = value.ToString();
                }
        }

        #endregion

        #region Implementation of IChartEditor

        public bool EnableColumnChart{ get; set; }
        public bool EnableBarChart { get; set; }
        public bool EnableLineChart { get; set; }
        public bool EnableCurveChart { get; set; }
        public bool EnablePieChart { get; set; }
        //public bool EnableGridLines { get; set; }
        public bool EnableChartTitle { get; set; }
        public int ChartWidth { get; set; }
        public int ChartHeight { get; set; }

        public ControlCollection OptionControls{get; set; }

        #endregion

        
    }
}