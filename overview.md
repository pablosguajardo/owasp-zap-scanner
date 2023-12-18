# Owasp Zap Scanner

This project is a Azure DevOps task that allows users to integrate Owasp Zap security analysis into their VSTS pipelines.

## Using the Owasp Zap Scanner

Follow the instructions below to add and configure the Owasp Zap Scanner in your build/release pipeline.

## Prerequisites
* You need to have OWASP Zed Attach Proxy installed (e.g., on onpremise or on a virtual machine) and exposed so it can be accessed over the internet. The following article Installing & Configuring Owasp Zap on an Azure Virtual Machine provides a detailed guide on how to do it.
* Obtain the API Key required to access the ZAP API by following the instructions on the Official Documentation.

### Add the Owasp Zap Scanner
Install the Owasp Zap Scanner in your Visual Studio Team Services account and search for the task in the available tasks. The task will appear in the _Test_ section of the task list. Add it to your build/release task.

![Required Configuration Options](https://raw.githubusercontent.com/pablosguajardo/owasp-zap-scanner/master/screenshots/zap-api-configuration.PNG)

### Required Options
* **ZAP API Url** : The fully qualified domain name (FQDN) with out the protocol. (Eg. _zap.example.com_)
* **API Key** : The API key for ZAP. Details about obtaining the API can be found on the Official Documentation
* **Target URL** : Target URL where the active scan is performed against.

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

On Windows servers you can complement the use of this extension with:

https://marketplace.visualstudio.com/items?itemName=solucionespsg.OwaspZapOnPremiseStartStop

With this extension you will be able to remotely start a new Owazap session on a new port, scan the URL and then stop the started session.



## Help to continue development.

If it helped you. You can help me:

https:// paypal.me/solucionespsg 