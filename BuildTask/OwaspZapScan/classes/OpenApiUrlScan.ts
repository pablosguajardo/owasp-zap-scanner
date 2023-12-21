import { ZapScanBase } from './ZapScanBase';
import { ScanResult } from '../interfaces/types/ScanResult';
import { ZapOpenApiUrlScanOptions } from '../interfaces/types/ZapScan';
import { ZapScanType } from '../enums/Enums';
import { TaskInput } from './TaskInput';
import { Constants } from './Constants';

export class OpenApiUrlScan extends ZapScanBase {
    zapScanType: ZapScanType = ZapScanType.OpenApi;
    private _scanOptions: ZapOpenApiUrlScanOptions;

    constructor(taskInputs: TaskInput) {
        super(taskInputs);

        /* Set Scan Type for Logging */
        this.scanType = Constants.OPENAPI_URL_SCAN_NAME;
      
        /* Open Api Scan Options */
        this._scanOptions = {
            apikey: this.taskInputs.ZapApiKey,
            url: this.taskInputs.OpenApiUrl,
            hostOverride: this.taskInputs.OpenApiHostOverride,
            contextId: this.taskInputs.OpenApiContextId,
            formMethod: 'GET',
            zapapiformat: 'JSON'
        };

        this.requestOptions = {
            // tslint:disable-next-line:no-http-string
            uri: `${this.taskInputs.ZapApiUrl}/JSON/openapi/action/importUrl/`,
            qs: this._scanOptions
        };
    }

    ExecuteScan(): Promise<ScanResult> {
        return super.ExecuteScan();
    }
}