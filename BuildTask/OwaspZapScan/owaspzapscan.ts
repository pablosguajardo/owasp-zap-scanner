import * as dotenv from 'dotenv';

import * as path from 'path';
import * as Task from 'vsts-task-lib';

import { RequestService } from './classes/RequestService';
import { ScanResult } from './interfaces/types/ScanResult';
import { IZapScan } from './interfaces/contracts/IZapScan';
import { ActiveScan } from './classes/ActiveScan';
import { SpiderScan } from './classes/SpiderScan';
import { Report } from './classes/Report';
import { Verify } from './classes/Verify';
import { Helper } from './classes/Helper';
import { ZapApiHelper } from './classes/ZapApiHelper';
import { TaskInput } from './classes/TaskInput';
import { AjaxSpiderScan } from './classes/AjaxSpiderScan';
import { OpenApiUrlScan } from './classes/OpenApiUrlScan';
import { OpenApiFileScan } from './classes/OpenApiFileScan';
import { Constants } from './classes/Constants';

Task.setResourcePath(path.join(__dirname, 'task.json'));

async function run(): Promise<string> {

    const promise = new Promise<string>(async (resolve, reject) => {

        try {
            const taskInputs: TaskInput = new TaskInput();
            /* Get the required inputs */
            taskInputs.ZapApiUrl = Task.getInput('ZapApiUrl', true);
            taskInputs.ZapApiKey = Task.getInput('ZapApiKey', true);
            taskInputs.TargetUrl = Task.getInput('TargetUrl', true);
            taskInputs.ClearSession = Task.getBoolInput('ClearSession');
            taskInputs.NewContext = Task.getBoolInput('NewContext');
            taskInputs.NewContextName = Task.getInput('NewContextName');

            /* Open Api Scan Options */
            taskInputs.ExecuteOpenApiScan = Task.getBoolInput('ExecuteOpenApiScan');
            taskInputs.OpenApiFile = Task.getInput('OpenApiFile');
            taskInputs.OpenApiUrl = Task.getInput('OpenApiUrl');
            taskInputs.OpenApiHostOverride = Task.getInput('OpenApiHostOverride');
            taskInputs.OpenApiContextId = Task.getInput('OpenApiContextId');

            /* Ajax Spider Scan Options */
            taskInputs.ExecuteAjaxSpiderScan = Task.getBoolInput('ExecuteAjaxSpiderScan');
            taskInputs.AjaxInScope = Task.getBoolInput('AjaxInScope');
            taskInputs.AjaxContextName = Task.getInput('AjaxContextName');
            taskInputs.AjaxSubTreeOnly = Task.getBoolInput('AjaxSubTreeOnly');


            /* Spider Scan Options */
            taskInputs.ExecuteSpiderScan = Task.getBoolInput('ExecuteSpiderScan');
            taskInputs.RecurseSpider = Task.getBoolInput('RecurseSpider');
            taskInputs.SubTreeOnly = Task.getBoolInput('SubtreeOnly');
            taskInputs.MaxChildrenToCrawl = Task.getInput('MaxChildrenToCrawl');
            taskInputs.ContextName = Task.getInput('ContextName');

            /* Active Scan Options inputs */
            taskInputs.ExecuteActiveScan = Task.getBoolInput('ExecuteActiveScan');
            taskInputs.ContextId = Task.getInput('ContextId');
            taskInputs.Recurse = Task.getBoolInput('Recurse');
            taskInputs.InScopeOnly = Task.getBoolInput('InScopeOnly');
            taskInputs.ScanPolicyName = Task.getInput('ScanPolicyName');
            taskInputs.Method = Task.getInput('Method');
            taskInputs.PostData = Task.getInput('PostData');

            /* Reporting options */
            taskInputs.ReportType = Task.getInput('ReportType');
            taskInputs.ReportFileDestination = Task.getPathInput('ReportFileDestination');
            taskInputs.ReportFileName = Task.getInput('ReportFileName');
            taskInputs.ProjectName = Task.getVariable('Build.Repository.Name');
            taskInputs.BuildDefinitionName = Task.getVariable('Build.DefinitionName');

            /* Verification Options */
            taskInputs.EnableVerifications = Task.getBoolInput('EnableVerifications');
            taskInputs.MaxHighRiskAlerts = parseInt(Task.getInput('MaxHighRiskAlerts'), 10);
            taskInputs.MaxMediumRiskAlerts = parseInt(Task.getInput('MaxMediumRiskAlerts'), 10);
            taskInputs.MaxLowRiskAlerts = parseInt(Task.getInput('MaxLowRiskAlerts'), 10);

            const apiHelper: ZapApiHelper = new ZapApiHelper(taskInputs);
            const requestService: RequestService = new RequestService();
            const helper: Helper = new Helper();

            //new session:
            if (taskInputs.ClearSession) {
                await apiHelper.ClearZapSession();
            }

            //new context
            if (taskInputs.NewContext) {
                const idNewContext = await apiHelper.CreateNewContext(taskInputs.NewContextName);
            }

            if (process.env.NODE_ENV !== 'test') {
                console.log(`OpenApiUrl: ${taskInputs.OpenApiUrl} OpenApiFile: ${taskInputs.OpenApiFile}`);
            }
            const report: Report = new Report(helper, requestService, taskInputs);

            const selectedScans: Array<IZapScan> = new Array<IZapScan>();
            let scanStatus: ScanResult = { Success: false };
            let hasIssues: boolean = false;

            /* Add Open Api Scan is selected */
            if (taskInputs.ExecuteOpenApiScan) {
                await helper.ValidateInputsOpenApi(taskInputs.OpenApiUrl, taskInputs.OpenApiFile);
                if (taskInputs.OpenApiUrl !== '') {
                    console.log('OpenAPI Scan from Url is selected.');
                    const openApiScan: OpenApiUrlScan = new OpenApiUrlScan(taskInputs);
                    selectedScans.push(openApiScan);
                } else {
                    console.log('OpenAPI Scan from File is selected.');
                    const openApiScanFile: OpenApiFileScan = new OpenApiFileScan(taskInputs);
                    selectedScans.push(openApiScanFile);

                }
            }
            /* Add Spider Scan is selected */
            if (taskInputs.ExecuteSpiderScan) {
                console.log('Spider scan is selected.');
                const spiderScan: SpiderScan = new SpiderScan(taskInputs);
                selectedScans.push(spiderScan);
            }
            /* Add Ajax Spider Scan is selected */
            if (taskInputs.ExecuteAjaxSpiderScan) {
                console.log('Ajax spider scan is selected.');
                const spiderAjaxScan: AjaxSpiderScan = new AjaxSpiderScan(taskInputs);
                selectedScans.push(spiderAjaxScan);
            }



            /* Add the Active Scan */
            if (taskInputs.ExecuteActiveScan) {
                console.log('Active scan is selected.');
                const activeScan: ActiveScan = new ActiveScan(taskInputs);
                selectedScans.push(activeScan);
            }

            /* Execute the Scans */
            for (let i: number = 0; i < selectedScans.length; i++) {
                const scan: IZapScan = selectedScans[i];
                scanStatus = await scan.ExecuteScan();

                if (!scanStatus.Success) {
                    let messageErr: string ="" ;
                    if(scan.scanType === Constants.OPENAPI_FILE_SCAN_NAME || scan.scanType === Constants.OPENAPI_URL_SCAN_NAME){
                        messageErr = ` Message: ${scanStatus.Message}` ;
                    }
                    const message: string = `The ${scan.scanType} failed with the error. Status: ${scanStatus.Success}${messageErr}`;
                    reject(message);
                }
            }

            /* If all scans are successful: 1). Generate the Report 2). Perform the Verifications */
            if (scanStatus.Success) {
                /* Generate the report */
                console.log('Generating the report...');
                const isSuccess: boolean = await report.GenerateReport();

                if (!isSuccess) {
                    hasIssues = isSuccess;
                }

                /* Perform the Verifications and Print the report */
                const verify: Verify = new Verify(helper, report, taskInputs);
                verify.Assert();

                resolve(`Owasp Zap Active Scan ${hasIssues ? 'Partially' : ''} Completed. Result is within the expected thresholds.`);
            } else {
                reject('A scan failed to complete.');
            }
        } catch (err) {
            const errmsg: any = process.env.NODE_ENV !== 'test' ? err.stack + err.message : err.stack || err;
            reject(errmsg);
        }
    });

    return promise;
}

run()
    .then((result: string) => {
        Task.setResult(Task.TaskResult.Succeeded, result);
    })
    .catch((err: any) => {
        Task.setResult(Task.TaskResult.Failed, `Task Failed. Error: ${JSON.stringify(err)}`);
    });
