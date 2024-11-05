# Owasp Zap Scanner

This project is a Azure DevOps task that allows users to integrate Owasp Zap security analysis into their VSTS pipelines.

## Using the Owasp Zap Scanner

Follow the instructions below to add and configure the Owasp Zap Scanner in your build/release pipeline.

## Prerequisites
* If you want to scan a local server without internet access, you must have OWASP Zed Attach Proxy installed. For example, on a virtual machine or on a local installation that has access to the web application to be scanned.

* If you want to scan an application that is exposed to the internet or has access to it through a virtual network accessed from Azure Pipelines, you can use the ZAP run option in Docker.

* Both examples can be run with this extension: [Owasp Zap Start Stop](https://marketplace.visualstudio.com/items?itemName=solucionespsg.OwaspZapOnPremiseStartStop)

* The following article explains how to configure OWASP Zap and provides a detailed guide on how to do it.

* Obtain the API Key required to access the ZAP API by following the instructions on the Official Documentation.

### Add the Owasp Zap Scanner
Install the Owasp Zap Scanner in your Visual Studio Team Services account and search for the task in the available tasks. The task will appear in the _Test_ section of the task list. Add it to your build/release task.

![Required Configuration Options](https://raw.githubusercontent.com/pablosguajardo/owasp-zap-scanner/master/screenshots/zap-api-configuration.PNG)

### Required Options
* **ZAP API Url** : The fully qualified domain name (FQDN) with out the protocol. (Eg. _zap.example.com_)
* **API Key** : The API key for ZAP. Details about obtaining the API can be found on the Official Documentation
* **Target URL** : Target URL where the active scan is performed against.

### Optional Options
* **New Session** : Creates a new session, optionally overwriting existing files. If a relative path is specified it will be resolved against the 'session' directory in ZAP 'home' dir.
* **New Context** : Create a new Context, optionally.

## Ajax Spider Scan Options
This configuration section includes the parameters that need to be sent to perform the active scan against the target.

![Ajax Spider Scan Options](https://raw.githubusercontent.com/pablosguajardo/owasp-zap-scanner/master/screenshots/ajax-spider-scan-options.png)

### Available Options
* **Execute Ajax Spider Scan** : Enable to run a spider scan on the target.
* **Subtree Only** : _(Optional)_ A boolean (true/false) indicating whether or not the crawl should be constrained to a specific path (default value is false). Enable to use the nodes underneath the one specified target to seed the Ajax spider.
* **in Scope** : _(Optional)_ A boolean (true/false) indicating whether or not the scan should be restricted to 'inScope' only resources (default value is false). Enable to use the nodes underneath the one specified target to seed the Ajax spider.
* **Context Name** : _(Optional)_ The name for any defined context. If the value does not match a defined context then an error will occur.

## Spider Scan Options
This configuration section includes the parameters that need to be sent to perform the active scan against the target.

![Spider Scan Options](https://raw.githubusercontent.com/pablosguajardo/owasp-zap-scanner/master/screenshots/spider-scan-options.png)

### Available Options
* **Execute Spider Scan** : Enable to run a spider scan on the target.
* **Recurse** : _(Optional)_ Enable to use the nodes underneath the one specified target to seed the spider.
* **Subtree Only** : _(Optional)_ Enable to restrict the spider under the target url subtree.
* **Context Name** : _(Optional)_ The name for any defined context. If the value does not match a defined context then an error will occur.
* **Max Children** : _(Optional)_ Set to limit the number of children scanned.

## Open Api Scan Options
This configuration section includes the parameters that need to be sent to perform the active scan against the target.

![Open Api Scan Options](https://raw.githubusercontent.com/pablosguajardo/owasp-zap-scanner/master/screenshots/open-api-scan-options.png)

### Available Options
* **Execute Open Api Scan** : Enable to run a Open Api scan on the target.
* **Url** : Enter data in URL or File. Not both. Url: The URL locating the OpenAPI definition. The url must exist and be accessible from the server running ZAP. If not, it will give an error. https://www.zaproxy.org/docs/desktop/addons/openapi-support
* **File** : Enter data in File or URL. Not both. The file that contains the OpenAPI definition. https://www.zaproxy.org/docs/desktop/addons/openapi-support
* **HostOverride/Target** : _(Optional)_ HostOverride: The Target URL (called hostOverride for historical reasons) to override the server URL present in the definition. Target: The Target URL to override the server URL present in the definition. https://www.zaproxy.org/docs/desktop/addons/openapi-support
* **Context ID** : _(Optional)_ Scan context identifier. https://www.zaproxy.org/docs/desktop/addons/openapi-support

## Active Scan Options
This configuration section includes the parameters that need to be sent to perform the active scan against the target.

![Active Scan Options](https://raw.githubusercontent.com/pablosguajardo/owasp-zap-scanner/master/screenshots/active-scan-options.PNG)

### Available Options
* **Execute Active Scan** : Enable to run an active scan on the target.
* **Context ID** : _(Optional)_ Context identifier of the Scan context.
* **Recurse** : _(Optional)_ Set recurse option to scan URLs under the given target URL.
* **In Scope Only** : _(Optional)_ Set In Scope only to true to constrain the scan to URLs that are in scope (ignored if a Context is specified).
* **Scan Policy Name** : _(Optional)_ Scan Policy Name allows to specify the scan policy (if none is given it uses the default scan policy).
* **Method** : _(Optional)_ Allow you to select a given request in conjunction with the given URL.
* **POST Data** : _(Optional)_ Allow you to select a given request in conjunction with the given URL.

## Configure Verification
This configuration section includes the parameters that need to be sent to perform the active scan against the target.

![Configure Verification](https://raw.githubusercontent.com/pablosguajardo/owasp-zap-scanner/master/screenshots/configure-verifications.PNG)

### Available Options
* **Enable Verifications**: Enable to add thresholds for security risk types and fail the build if the threshold is exceeded.
* **High Risk Alert Threshold**: Maximum number of allowed High Risk Alerts. The build will fail if the number of high risk alerts equals or exceeds this threshold.
* **Medium Risk Alert Threshold**: Maximum number of allowed Medium Risk Alerts. The build will fail if the number of medium risk alerts equals or exceeds this threshold.
* **Low Risk Alert Threshold**: Maximum number of allowed Low Risk Alerts. The build will fail if the number of low risk alerts equals or exceeds this threshold.

## Configure Reports
This configuration section includes the parameters that need to be sent to perform the active scan against the target.


![Configure Reports](https://raw.githubusercontent.com/pablosguajardo/owasp-zap-scanner/master/screenshots/configure-reports.PNG)


### Available Options
* **Report Type** : Select the type of report you want generated. Available types are _**HTML**_, _**XML**_, _**Markdown**_ or _**All**_.
* **Destination Folder** : The destination folder that the report file is created. You can use [variables](https://go.microsoft.com/fwlink/?LinkID=550988). Eg. _$(agent.builddirectory)_.
* **Report Filename** : Name of the report file, without the extension. Extension is determined by the _**Report Type**_. Eg. _OWASP-ZAP-Report-2017-00-00_.


## Additional

To complement the use of this extension it is recommended to use:

https://marketplace.visualstudio.com/items?itemName=solucionespsg.OwaspZapOnPremiseStartStop

With the extension OwaspZapStartStop VSTS task start, stop, download template and transform test result on Windows Server OnPremise (selft hosted) and run in Docker on Linux (Agent pool Azure Pipelines).

# Full example

### Agent Job:
![alt tag](https://raw.githubusercontent.com/pablosguajardo/templates/main/img/owaspStartStop/ss1.png)


### Owasp Zap Start
![alt tag](https://raw.githubusercontent.com/pablosguajardo/templates/main/img/owaspStartStop/ss2.png)

If you want to run it OnPremise select: **"Onpremise/Virtual (Self-hosted Agent Specification Windows)"**

If you want to run it on Azure Pipelines Hosted (linux option) select: **"Run in docker (Agent Specification Linux)"**


### Owasp Zap Scan
![alt tag](https://raw.githubusercontent.com/pablosguajardo/templates/main/img/owaspStartStop/ss3.png)

"Owasp Zap Scan" can be downloaded from here: https://marketplace.visualstudio.com/items?itemName=solucionespsg.owasp-zap-scan-psg

### Upload Report To Azure Devops Wiki
![alt tag](https://raw.githubusercontent.com/pablosguajardo/templates/main/img/owaspStartStop/ss7.png)

"Upload Report To Azure Devops Wiki" can be downloaded from here: https://marketplace.visualstudio.com/items?itemName=solucionespsg.UploadReportToAzureDevopsWiki

### Owasp Zap Stop
![alt tag](https://raw.githubusercontent.com/pablosguajardo/templates/main/img/owaspStartStop/ss4.png)


### Publish Test Result Converted
![alt tag](https://raw.githubusercontent.com/pablosguajardo/templates/main/img/owaspStartStop/ss5.png)

Then there is this "Publish Test Result" this is from Microsoft: https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/publish-test-results-v2

### Example of variables
![alt tag](https://raw.githubusercontent.com/pablosguajardo/templates/main/img/owaspStartStop/ss8.png)

### After finishing the tasks we access the tests:
![alt tag](https://raw.githubusercontent.com/pablosguajardo/templates/main/img/owaspStartStop/ss6.png)




## Help to continue development.

If it helped you. You can help me:

https:// paypal.me/solucionespsg 