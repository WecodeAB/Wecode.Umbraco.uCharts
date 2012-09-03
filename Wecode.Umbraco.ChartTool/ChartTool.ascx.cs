using System;
using System.Web.UI;
using umbraco.editorControls.userControlGrapper;

namespace Wecode.Umbraco.ChartTool
{
    public partial class ChartTool : UserControl, IUsercontrolDataEditor, IChartEditor
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (!string.IsNullOrEmpty(_umbracoValue))
                javaScriptArrayHidden.Value = _umbracoValue;

            widthHidden.Value = ChartWidth.ToString();
            heightHidden.Value = ChartHeight.ToString();
            

            ToggleChartTypes();
            ToggleOptions();
   
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

        #endregion

        
    }
}