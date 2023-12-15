import { ZapScanBase } from './ZapScanBase';
import { ScanResult } from './../interfaces/types/ScanResult';
import { ZapAjaxSpiderScanOptions } from '../interfaces/types/ZapScan';
import { ZapScanType } from '../enums/Enums';
import { TaskInput } from './TaskInput';
import { Constants } from './Constants';

export class AjaxSpiderScan extends ZapScanBase {
    zapScanType: ZapScanType = ZapScanType.AjaxSpider;
    private _scanOptions: ZapAjaxSpiderScanOptions;    

    constructor(taskInputs: TaskInput) {
        super(taskInputs);

        /* Set Scan Type for Logging */
        this.scanType = Constants.AJAX_SPIDER_SCAN_NAME;

        //doc: https://www.zaproxy.org/docs/api/#ajaxspideractionscan
        /* Spider Scan Options */
        this._scanOptions = {
            apikey: this.taskInputs.ZapApiKey,
            url: this.taskInputs.TargetUrl,        
            inScope: this.taskInputs.AjaxInScope,
            subtreeOnly: this.taskInputs.AjaxSubTreeOnly,
            contextName: this.taskInputs.AjaxContextName,
            formMethod: 'GET',
            zapapiformat: 'JSON'
        };

        this.requestOptions = {
            // tslint:disable-next-line:no-http-string
            uri: `${this.taskInputs.ZapApiUrl}/JSON/ajaxSpider/action/scan/`,
            qs: this._scanOptions
        };   
    }
    
    ExecuteScan(): Promise<ScanResult> {
        return super.ExecuteScan();
    }
}