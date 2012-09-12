using System;
using System.Collections.Generic;
using System.Web.UI;
using System.Web.UI.WebControls;
using umbraco.IO;

namespace Wecode.Umbraco.ChartTool
{
    public class ChartToolEditor : PlaceHolder, IChartEditor
    {
        private string _usercontrolPath = IOHelper.ResolveUrl(SystemDirectories.Umbraco) + "/plugins/Wecode.Umbraco.ChartTool/ChartTool.ascx";
        private object _value;

        #region Properties

        private bool FirstLoad
        {
            get
            {
                if (ViewState["FirstLoad"] == null)
                {
                    ViewState["FirstLoad"] = true;
                }

                return Convert.ToBoolean(ViewState["FirstLoad"]);
            }
            set
            {
                ViewState["FirstLoad"] = value;
            }
        }

        #region Implementation of IChartEditor

        public object Value
        {
            get
            {
                return ((ChartTool)Controls[0]).value;
            }
            set
            {
                _value = value;
            }
        }

        public bool EnableColumnChart { get; set; }
        public bool EnableBarChart { get; set; }
        public bool EnableLineChart { get; set; }
        public bool EnableCurveChart { get; set; }
        public bool EnablePieChart { get; set; }
        public bool EnableGridLines { get; set; }
        public bool EnableChartTitle { get; set; }
        public int ChartWidth { get; set; }
        public int ChartHeight { get; set; }

        public ControlCollection OptionControls
        {
            get; set; }

        #endregion

        #endregion

        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);

            this.Controls.Add(new UserControl().LoadControl(_usercontrolPath));
        }

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);

            ((ChartTool) Controls[0]).OptionControls = OptionControls;
            ((ChartTool) Controls[0]).EnableColumnChart = EnableColumnChart;
            ((ChartTool) Controls[0]).EnableBarChart = EnableBarChart;
            ((ChartTool) Controls[0]).EnableChartTitle = EnableChartTitle;
            ((ChartTool) Controls[0]).EnableCurveChart = EnableCurveChart;
            //((ChartTool) Controls[0]).EnableGridLines = EnableGridLines;
            ((ChartTool) Controls[0]).EnableLineChart = EnableLineChart;
            ((ChartTool) Controls[0]).EnablePieChart = EnablePieChart;
            ((ChartTool) Controls[0]).ChartHeight = ChartHeight;
            ((ChartTool) Controls[0]).ChartWidth = ChartWidth;

            if (FirstLoad)
            {
                //The value only needs to be set the first time the page is loaded.
                //If the value is set multiple times the user will loose it's selected items after pressing the save button.
                //We don't use Page.IsPostBack for this because the control could also be loaded the first time on a postback (with Canvas).
                ((ChartTool)Controls[0]).value = _value;

                FirstLoad = false;
            }
        }

        
    }
}