<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ChartTool.ascx.cs" Inherits="Wecode.Umbraco.uCharts.ChartTool" %>
<%@ Register TagPrefix="umb" Namespace="ClientDependency.Core.Controls" Assembly="ClientDependency.Core" %>


<umb:CssInclude ID="CssIncludeHandsonTable" runat="server" FilePath="plugins/uCharts/jquery.handsontable.css" PathNameAlias="UmbracoRoot"/>
<umb:JsInclude ID="JsIncludeHandsonTable" runat="server" FilePath="plugins/uCharts/jquery.handsontable.js" PathNameAlias="UmbracoRoot"/>
<umb:JsInclude ID="JsIncludeGoogleChartsAPI" runat="server" FilePath="https://www.google.com/jsapi"  />
<umb:JsInclude ID="JsIncludeUCharts" runat="server" FilePath="plugins/uCharts/uCharts.js" PathNameAlias="UmbracoRoot"/>

<%-- 
<script type="text/javascript" src="/umbraco/plugins/uCharts/jquery.handsontable.js"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript" src="/umbraco/plugins/uCharts/uCharts.js?v=000002"></script>
--%>

    
    <script type="text/javascript">
        $(function () {
            uChartComponentHandler.initUCharts(new uChart({
                hiddenSettingsId: "#<%= javaScriptArrayHidden.ClientID %>",
                handsonTableId: "#dataTable_<%= UniqueUChartId %>",
                googleChartDivId: "#<%= chart_div.ClientID %>",
                chartSettingsClass: ".chartSetting_<%= UniqueUChartId %>",
                chartTypeClass: ".chartChooser_<%= UniqueUChartId %>"
            }));
        });
    </script>
  
    <fieldset>
        <legend>Input Data</legend>
        <asp:PlaceHolder runat="server" ID="placeHolderChartTitle">
            <div>
                <label for="chartTitle">Chart Title</label>
                <input type="text" id="chartTitle" data-key="title" class="chartSetting_<%= UniqueUChartId %>" />
            </div>
        </asp:PlaceHolder>
        
        <asp:PlaceHolder runat="server" ID="placeHolderChartHAxisTitle">
            <div>
                <label for="chartHAxisTitle">Horizontal Axis Title</label>
                <input type="text" id="chartHAxisTitle" data-key="hAxis.title" class="chartSetting_<%= UniqueUChartId %>"/>
            </div>
        </asp:PlaceHolder>
        
          <asp:PlaceHolder runat="server" ID="placeHolderChartVAxisTitle">
            <div>
                <label for="chartVAxisTitle">Vertical Axis Title</label>
                <input type="text" id="chartVAxisTitle" data-key="vAxis.title" class="chartSetting_<%= UniqueUChartId %>"/>
            </div>
        </asp:PlaceHolder>
       

        <div id="dataTable_<%= UniqueUChartId %>" class="dataTable" style="width: 700px;height: 200px; overflow: scroll"></div>
        
        <asp:HiddenField runat="server" ID="javaScriptArrayHidden"></asp:HiddenField>
        <asp:HiddenField runat="server" ID="widthHidden" ClientIDMode="Static" ></asp:HiddenField>
        <asp:HiddenField runat="server" ID="heightHidden" ClientIDMode="Static" ></asp:HiddenField>
    </fieldset>
    <br/>
    <br/>
     
     <fieldset>
        <legend>Choose Chart Type</legend>
        <asp:PlaceHolder runat="server" ID="placeHolderColumnChart">
            <div>
                <input type="radio" id="column" checked="checked" name="chart_<%= UniqueUChartId %>" value="column" title="Column Chart" data-key="Column" class="chartChooser_<%= UniqueUChartId %>"/>
                <label for="bar">
                    <img src="/umbraco/plugins/uCharts/chart_column.png" alt="Column Chart"/>
                    Column Chart
                </label>
            </div>
        </asp:PlaceHolder>
        <asp:PlaceHolder runat="server" ID="placeHolderBarChart">
            <div>
                <input type="radio" id="bar" name="chart_<%= UniqueUChartId %>" value="bar" title="Bar Chart" data-key="Bar" class="chartChooser_<%= UniqueUChartId %>"/>
                <label for="bar">
                    <img src="/umbraco/plugins/uCharts/chart_bar.png" alt="Bar Chart"/>
                    Bar Chart
                </label>
            </div>
        </asp:PlaceHolder>
        <asp:PlaceHolder runat="server" ID="placeHolderLineChart">
            <div>
               
                <input type="radio" id="line" name="chart_<%= UniqueUChartId %>" value="line" title="Line Chart" data-key="Line" class="chartChooser_<%= UniqueUChartId %>"/>
                 <label for="line">
                     <img src="/umbraco/plugins/uCharts/chart_line.png" alt="Line Chart"/> 
                     Line Chart
                 </label>
            </div>
        </asp:PlaceHolder>
        <asp:PlaceHolder runat="server" ID="placeHolderCurveChart">
            <div>
               
                <input type="radio" id="curve" name="chart_<%= UniqueUChartId %>" value="curve" title="Curve Chart" data-key="Curve" class="chartChooser_<%= UniqueUChartId %>"/>
                 <label for="curve">
                    <img src="/umbraco/plugins/uCharts/chart_curve.png" alt="Curve Chart"/>
                    Curve Chart
                </label>
            </div>
        </asp:PlaceHolder>
        <asp:PlaceHolder runat="server" ID="placeHolderPieChart">
            <div>
                 <input type="radio" id="pie" name="chart_<%= UniqueUChartId %>" value="pie" title="Pie Chart" data-key="Pie" class="chartChooser_<%= UniqueUChartId %>"/>
                <label for="pie">
                    <img src="/umbraco/plugins/uCharts/chart_pie.png" alt="Pie Chart"/>
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
                    <img src="plugins/uCharts/chart_gridLines.png" alt="Grid Lines"/> 
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
        <div id="chart_div" runat="server"></div>
    </fieldset>


    
    
    
   