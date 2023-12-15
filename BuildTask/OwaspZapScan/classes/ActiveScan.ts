import { ZapScanBase } from './ZapScanBase';
import { ScanResult } from './../interfaces/types/ScanResult';
import { ZapActiveScanOptions } from './../interfaces/types/ZapScan';
import { ZapScanType } from '../enums/Enums';
import { TaskInput } from './TaskInput';
import { Constants } from './Constants';

export class ActiveScan extends ZapScanBase {
    zapScanType: ZapScanType = ZapScanType.Active;    
    private _scanOptions: ZapActiveScanOptions;    

    constructor(taskInputs: TaskInput) {
        super(taskInputs);
        
        /* Set Scan Type for Logging */
        this.scanType = Constants.ACTIVE_SCAN_NAME;

        /* Active Scan Options */
        this._scanOptions = {
            apikey: this.taskInputs.ZapApiKey,
            url: this.taskInputs.TargetUrl,
            contextId: this.taskInputs.ContextId,
            method: this.taskInputs.Method,
            inScopeOnly: String(this.taskInputs.InScopeOnly),
            recurse: String(this.taskInputs.Recurse),
            scanPolicyName: this.taskInputs.ScanPolicyName,
            postData: this.taskInputs.PostData,
            zapapiformat: 'JSON',
            formMethod: 'GET'
        };

        /* Scan Request Options */
        this.requestOptions = {
            // tslint:disable-next-line:no-http-string
            uri: `${this.taskInputs.ZapApiUrl}/JSON/ascan/action/scan/`,
            qs: this._scanOptions
        };
    }

    ExecuteScan(): Promise<ScanResult> {
        return super.ExecuteScan();
    }
}