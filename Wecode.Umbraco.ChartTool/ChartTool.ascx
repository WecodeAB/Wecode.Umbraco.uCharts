<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ChartTool.ascx.cs" Inherits="Wecode.Umbraco.ChartTool.ChartTool" %>
<%@ Register TagPrefix="umb" Namespace="ClientDependency.Core.Controls" Assembly="ClientDependency.Core" %>


<umb:CssInclude ID="CssIncludeHandsonTable" runat="server" FilePath="plugins/Wecode.Umbraco.ChartTool/jquery.handsontable.css" PathNameAlias="UmbracoRoot"/>
<%--<umb:JsInclude ID="JsIncludeHandsonTable" runat="server" FilePath="plugins/Wecode.Umbraco.ChartTool/jquery.handsontable.js" PathNameAlias="UmbracoRoot"/>
<umb:JsInclude ID="JsIncludeGoogleChartsAPI" runat="server" FilePath="https://www.google.com/jsapi"  />
<umb:JsInclude ID="JsIncludeChartTool" runat="server" FilePath="plugins/Wecode.Umbraco.ChartTool/chartTool.js" PathNameAlias="UmbracoRoot"/>--%>

<script type="text/javascript" src="plugins/Wecode.Umbraco.ChartTool/jquery.handsontable.js"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript" src="plugins/Wecode.Umbraco.ChartTool/chartTool.js?v=000000006"></script>
    
  
    <fieldset>
        <legend>Input Data</legend>
        <asp:PlaceHolder runat="server" ID="placeHolderChartTitle">
            <div>
                <label for="chartTitle">Chart Title</label>
                <input type="text" id="chartTitle" data-key="title" class="chartSetting"/>
            </div>
        </asp:PlaceHolder>
        
        <asp:PlaceHolder runat="server" ID="placeHolderChartHAxisTitle">
            <div>
                <label for="chartHAxisTitle">Horizontal Axis Title</label>
                <input type="text" id="chartHAxisTitle" data-key="hAxis.title" class="chartSetting"/>
            </div>
        </asp:PlaceHolder>
        
          <asp:PlaceHolder runat="server" ID="placeHolderChartVAxisTitle">
            <div>
                <label for="chartVAxisTitle">Vertical Axis Title</label>
                <input type="text" id="chartVAxisTitle" data-key="vAxis.title" class="chartSetting"/>
            </div>
        </asp:PlaceHolder>
       

        <div id="dataTable" class="dataTable" style="width: 700px;height: 200px; overflow: scroll"></div>
        
        <asp:HiddenField runat="server" ID="javaScriptArrayHidden" ClientIDMode="Static" ></asp:HiddenField>
        <asp:HiddenField runat="server" ID="widthHidden" ClientIDMode="Static" ></asp:HiddenField>
        <asp:HiddenField runat="server" ID="heightHidden" ClientIDMode="Static" ></asp:HiddenField>
    </fieldset>
    <br/>
    <br/>
     
     <fieldset>
        <legend>Choose Chart Type</legend>
        <asp:PlaceHolder runat="server" ID="placeHolderColumnChart">
            <div>
                <input type="radio" id="column" name="chart" value="column" title="Column Chart" data-key="Column" class="chartChooser"/>
                <label for="bar">
                    <img src="plugins/Wecode.Umbraco.ChartTool/chart_column.png" alt="Column Chart"/>
                    Column Chart
                </label>
            </div>
        </asp:PlaceHolder>
        <asp:PlaceHolder runat="server" ID="placeHolderBarChart">
            <div>
                <input type="radio" id="bar" name="chart" value="bar" title="Bar Chart" data-key="Bar" class="chartChooser"/>
                <label for="bar">
                    <img src="plugins/Wecode.Umbraco.ChartTool/chart_bar.png" alt="Bar Chart"/>
                    Bar Chart
                </label>
            </div>
        </asp:PlaceHolder>
        <asp:PlaceHolder runat="server" ID="placeHolderLineChart">
            <div>
               
                <input type="radio" id="line" name="chart" value="line" title="Line Chart" data-key="Line" class="chartChooser"/>
                 <label for="line">
                     <img src="plugins/Wecode.Umbraco.ChartTool/chart_line.png" alt="Line Chart"/> 
                     Line Chart
                 </label>
            </div>
        </asp:PlaceHolder>
        <asp:PlaceHolder runat="server" ID="placeHolderCurveChart">
            <div>
               
                <input type="radio" id="curve" name="chart" value="curve" title="Curve Chart" data-key="Curve" class="chartChooser"/>
                 <label for="curve">
                    <img src="plugins/Wecode.Umbraco.ChartTool/chart_curve.png" alt="Curve Chart"/>
                    Curve Chart
                </label>
            </div>
        </asp:PlaceHolder>
        <asp:PlaceHolder runat="server" ID="placeHolderPieChart">
            <div>
                 <input type="radio" id="pie" name="chart" value="pie" title="Pie Chart" data-key="Pie" class="chartChooser"/>
                <label for="pie">
                    <img src="plugins/Wecode.Umbraco.ChartTool/chart_pie.png" alt="Pie Chart"/>
                    Pie Chart
                </label>
               
            </div>
        </asp:PlaceHolder>
    </fieldset>
    <br />
    <br />
              <%--<fieldset>
        <legend>Options</legend>
            <asp:PlaceHolder runat="server" ID="placeHolderGridLines">
            <div>
                <input class="checkboxes" data-key="gridLines" type="checkbox" id="gridLines" name="gridLines" value="gridLines" title="Grid Lines"/>
                <label for="gridLines">
                    <img src="plugins/Wecode.Umbraco.ChartTool/chart_gridLines.png" alt="Grid Lines"/> 
                    Show grid lines
                </label>
                
            </div>
        </asp:PlaceHolder>
        <div>
                <input class="checkboxes" data-key="is3D" checked="checked" type="checkbox" id="is3D" name="is3D" value="is3D" title="Is 3D"/>
                <label for="is3D">
                    
                    3D chart
                </label>
                
            </div>
    </fieldset>
    <br/>
    <br/>
    --%>
    <fieldset>
        <legend>Chart</legend>
        <div id="chart_div" runat="server" clientidmode="Static"></div>
    </fieldset>


    
    
    
   