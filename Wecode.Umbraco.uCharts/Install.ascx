<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Install.ascx.cs" Inherits="Wecode.Umbraco.uCharts.Install" %>

<h1>Thank you for installing uCharts</h1>
<p>
    In order for everything to work as expected you need to do the following post-installation tasks. 
</p>

<ol>
<li>
    Make sure that TidyEditorContent is off. Open config/umbracoSettings.config and make sure that TidyEditorContent is set to false. 
</li>    
<li>
    In the backoffice go to developer->macros->uCharts For Rte and add a property with Alias uCharts, Name uCharts  and Type uCharts.
</li>
<li>
    <p>
        If you want to support large datasets (background data for your charts) you might need to change requestLimits on your web.config.
    </p>
    <p>
        Locate system.web tag and update the httpRuntime tag to this:<br/>
        &lt;httpRuntime requestValidationMode="2.0" maxUrlLength="10999" maxQueryStringLength="2097151"/&gt;
    </p>
    <p>
        Add the following snippet to the system.webServer tag:<br/>
        &lt;security&gt; <br/>
         &lt;requestFiltering&gt;<br/>
          &lt;requestLimits maxUrl="10999" maxQueryString="9999" /&gt;<br/>
         &lt;/requestFiltering&gt; <br/>
        &lt;/security&gt;<br/>
    </p>
</li>
<li>
    The size of the macro popup in the RTE is a bit small for uCharts chart editor to be manageable therefore you have to make a change in the file %ProjectFolder%\umbraco_client\tinymce3\plugins\umbracomacro\editor_plugin_src.js on rows 59 and 60. This is optional but recomended.
    width: 760 + parseInt(ed.getLang('umbracomacro.delta_width', 0)), 
    height: 570 + parseInt(ed.getLang('umbracomacro.delta_height', 0)),
    Note: As a result of this all the macro popups will be this size.
</li>
</ol>

<p>
    Enjoy!
</p>
