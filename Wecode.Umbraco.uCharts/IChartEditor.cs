using System.Web.UI;

namespace Wecode.Umbraco.uCharts
{
    public interface IChartEditor
    {
        bool EnableColumnChart { get; set; }
        bool EnableBarChart { get; set; }
        bool EnableLineChart { get; set; }
        bool EnableCurveChart { get; set; }
        bool EnablePieChart { get; set; }
        //bool EnableGridLines { get; set; }
        bool EnableChartTitle { get; set; }
        int ChartWidth{ get; set; }
        int ChartHeight { get; set; }

       
        ControlCollection OptionControls{ get; set; }
    }
}