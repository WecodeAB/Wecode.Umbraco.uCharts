using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using umbraco.interfaces;

namespace Wecode.Umbraco.ChartTool
{
    public class ChartToolMacroRender : ChartToolEditor, IMacroGuiRendering
    {
        string _value = "";

        protected override void OnInit(EventArgs e)
        {

            base.OnInit(e);
            this.EnableBarChart =
           this.EnableChartTitle =
           this.EnableColumnChart =
           this.EnableCurveChart =
           this.EnableGridLines =
           this.EnableLineChart =
           this.EnablePieChart =
           true;

            this.OptionControls = new ControlCollection(this);

            if (this.FirstLoad)
            {
                //The value only needs to be set the first time the page is loaded.
                //If the value is set multiple times the user will loose it's selected items after pressing the save button.
                //We don't use Page.IsPostBack for this because the control could also be loaded the first time on a postback (with Canvas).
                ((ChartTool)Controls[0]).value = _value;

                FirstLoad = false;
            }

            
        }

        public ChartToolMacroRender()
        {
            //
            // TODO: Add constructor logic here
            //
        }
        /*
        protected override void OnLoad(EventArgs e)
        {
            this.EnableBarChart = 
            this.EnableChartTitle = 
            this.EnableColumnChart =
            this.EnableCurveChart =
            this.EnableGridLines =
            this.EnableLineChart = 
            this.EnablePieChart =            
            true;
            
            this.OptionControls = new ControlCollection(this);

            if (this.FirstLoad)
            {
                //The value only needs to be set the first time the page is loaded.
                //If the value is set multiple times the user will loose it's selected items after pressing the save button.
                //We don't use Page.IsPostBack for this because the control could also be loaded the first time on a postback (with Canvas).
                ((ChartTool)Controls[0]).value = _value;

                FirstLoad = false;
            }

            base.OnLoad(e);           

        }
        */

        public bool ShowCaption
        {
            get {return true;}
        }

        public string Value
        {
            get { return ((ChartTool)Controls[0]).value.ToString(); }

            set { _value = value; }
        }

        private string ParseValue(string value)
        {
            return HttpUtility.UrlEncode(value);
        }
    }
}