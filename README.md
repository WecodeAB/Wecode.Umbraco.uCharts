uCharts
====================

_V 0.2_
--------------

Overview
Installation
Package installation
Manual installation
Copy the files
Configuring the Macro
Configuring the DataType
Post installation
Adding charts to your documents
The Macro
The DataType




###Overview

uCharts is a component that utilises Google Visualisation API (Google Chart tools) in an easy way for your Umbraco site. It also utilises Handsontable, a minimalistic Excel-like data grid editor to provide an easy way for editors to manage the underlying data of the chart.

uCharts provides two ways to manage charts. A data type and a macro for RTE.
###Installation

####Package installation
Install the package as usual. After the install has completed, a couple of steps needs to be done to make sure uCharts will run as expected. Se chapter about post installation.

####Manual installation
Download the code and unzip it. 

Copy the files

Copy Wecode.Umbraco.uCharts.dll and Wecode.Umbraco.uCharts.pdb to the bin folder.

Copy ChartToolMacro.cshtml to the folder %ProjectFolder%\macroScripts.

Copy the rest of the files to %ProjectFolder%\umbraco\plugins\uCharts.

#####Configuring the Macro

In your umbraco database add a row to the table cmsMacroPropertyType as follows:
[table here]

Create a macro called “uCharts For Rte” with the Alias uChartsRTE and choose the script file ChartToolMacro.cshtml. Make sure that Use in editor is checked and Render content is unchecked.

Click the parameters tab and add a parameter of the Type uCharts with Alias uCharts and Name uCharts.

#####Configuring the DataType

Create a DataType with the Name uCharts and choose uCharts as “Render control” and “Database datatype” as ntext.

After the install has completed, a couple of steps needs to be done to make sure uCharts will run as expected. Se chapter about post installation

###Post installation

In order for everything to work as expected you might need to do the following post-installation tasks. 

* Make sure that TidyEditorContent is off. Open config/umbracoSettings.config and make sure that TidyEditorContent is set to false. This is required for the RTE-version to work.

* In the backoffice go to developer->macros->uCharts For Rte and add a property with Alias uCharts, Name uCharts  and Type uCharts. This is required for the RTE-version to work.
* If you want to support large datasets (background data for your charts) you might need to change requestLimits on your web.config. Locate system.web tag and update the httpRuntime tag to this: 
    <httpRuntime requestValidationMode="2.0" maxUrlLength="10999" maxQueryStringLength="2097151"/>

Add the following snippet to the system.webServer tag:

    <security> 
     <requestFiltering>
      <requestLimits maxUrl="10999" maxQueryString="9999" />
     </requestFiltering> 
    </security>

* The size of the macro popup in the RTE is a bit small for uCharts chart editor to be manageable therefore you have to make a change in the file %ProjectFolder%\umbraco_client\tinymce3\plugins\umbracomacro\editor_plugin_src.js on rows 59 and 60. This is optional but recomended.

    width: 760 + parseInt(ed.getLang('umbracomacro.delta_width', 0)), 
    height: 570 + parseInt(ed.getLang('umbracomacro.delta_height', 0)),

Note: As a result of this all the macro popups will be this size.



###Adding charts to your documents

In order for uCharts to work, you need to reference two javascript libraries on your page or template. jQuery and the Google Visualisation API.

If you don't have it installed already just copy this row into the header section of your site.

    <script type="text/javascript" src="/umbraco/plugins/uCharts/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript" src="/umbraco/plugins/uCharts/chartToolMacro.js"></script>

####The Macro

uCharts for RTE that will make it possible for you to include uCharts anywhere you want in your Rich Text Editors(RTE). Just chose the macro in your RTE and configure it as you want and off you go. A nice chart is rendered on your page.

####The DataType

If your customers does not have enough knowledge to manage a RTE this might be the way to go. Just include the uCharts DataType on any document type you want and get a nice chart editor right among your other DataTypes. Also add the macro “uCharts For DataType” in the corresponding template as follows:

<umbraco:Macro Alias="uChartsDataType" runat="server" />

**Important! This is has a couple of drawbacks right now. it is limited to one chart per document.**