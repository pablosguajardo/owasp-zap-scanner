import { ZapScanBase } from './ZapScanBase';
import { ScanResult } from '../interfaces/types/ScanResult';
import { ZapOpenApiFileScanOptions } from '../interfaces/types/ZapScan';
import { ZapScanType } from '../enums/Enums';
import { TaskInput } from './TaskInput';
import { Constants } from './Constants';

export class OpenApiFileScan extends ZapScanBase {
    zapScanType: ZapScanType = ZapScanType.OpenApi;
    private _scanOptions: ZapOpenApiFileScanOptions;

    constructor(taskInputs: TaskInput) {
        super(taskInputs);

        /* Set Scan Type for Logging */
        this.scanType = Constants.OPENAPI_FILE_SCAN_NAME;
      
        /* Open Api Scan Options */
        this._scanOptions = {
            apikey: this.taskInputs.ZapApiKey,
            file: this.taskInputs.OpenApiFile,
            target: this.taskInputs.OpenApiHostOverride,
            contextId: this.taskInputs.ContextId,
            formMethod: 'GET',
            zapapiformat: 'JSON'
        };

        this.requestOptions = {
            // tslint:disable-next-line:no-http-string
            uri: `${this.taskInputs.ZapApiUrl}/JSON/openapi/action/importFile/`,
            qs: this._scanOptions
        };
    }

    ExecuteScan(): Promise<ScanResult> {
        return super.ExecuteScan();
    }
}