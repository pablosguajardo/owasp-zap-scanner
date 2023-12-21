import * as Task from 'vsts-task-lib';
import * as Request from 'request';
import * as RequestPromise from 'request-promise';
// tslint:disable-next-line:no-require-imports
import sleep = require('thread-sleep');

import { IZapScan } from './../interfaces/contracts/IZapScan';
import { ScanResult } from '../interfaces/types/ScanResult';
import { ZapScanResult, ZapScanStatus, ZapActiveScanOptions, ZapScanStatusOptions, ZapAjaxScanStatus, ZapAjaxScanStatusOptions } from '../interfaces/types/ZapScan';
import { ZapScanType } from './../enums/Enums';
import { TaskInput } from './TaskInput';
import { Constants } from './Constants';

export abstract class ZapScanBase implements IZapScan {
    zapScanType: ZapScanType;
    scanType: string;
    requestOptions: Request.UriOptions & RequestPromise.RequestPromiseOptions;
    protected taskInputs: TaskInput;

    constructor(taskInputs: TaskInput) {
        this.taskInputs = taskInputs;
    }

    ExecuteScan(): Promise<ScanResult> {
        Task.debug(`${this.scanType} | Target URL: ${this.requestOptions.uri} | Scan Options: ${JSON.stringify(this.requestOptions.qs)}`);
        if (process.env.NODE_ENV !== 'test') {
            console.log(`ExecuteScan ${this.scanType} | Target URL: ${this.requestOptions.uri} | Scan Options: ${JSON.stringify(this.requestOptions.qs)}`);
        }
        const scanResult: ScanResult = { Success: false };

        return new Promise<ScanResult>((resolve, reject) => {
            RequestPromise(this.requestOptions)
                .then(async (res: any) => {
                    if (this.scanType === Constants.OPENAPI_FILE_SCAN_NAME || this.scanType === Constants.OPENAPI_URL_SCAN_NAME) {
                        scanResult.Success = true;
                    } else {
                        const result: ZapScanResult = JSON.parse(res);
                        //ver que pasa en ajax:
                        if (process.env.NODE_ENV !== 'test') {
                            console.log(`res: ${res}`);
                        }
                        if (this.scanType === Constants.AJAX_SPIDER_SCAN_NAME) {
                            console.log(`Owasp Zap ${this.scanType} Initiated. Result: ${result.result}`);
                        } else {
                            console.log(`Owasp Zap ${this.scanType} Initiated. ID: ${result.scan}`);
                        }
                        scanResult.Success = await this.CheckScanStatus(result.scan, this.zapScanType);
                        if (!scanResult.Success) {
                            scanResult.Message = `${this.scanType} status check failed.`;
                            reject(scanResult);
                        }
                    }
                    resolve(scanResult);
                })
                .catch((err: any) => {
                    scanResult.Success = false;
                    scanResult.Message = err.message || err;
                    reject(scanResult);
                });
        });
    }

    protected CheckScanStatus(scanId: number, scanType: ZapScanType): Promise<boolean> {
        let previousScanStatus: number = 0;
        let scanCompleted: boolean = false;

        return new Promise<boolean>(async (resolve, reject) => {
            try {
                // tslint:disable-next-line:no-constant-condition
                while (true) {
                    sleep(10000);
                    const scanStatus: number = await this.GetScanStatus(scanId, scanType);
                    if (scanStatus < 0) {
                        throw new Error(`Failed to get ${this.scanType} status.`);
                    }
                    if (scanStatus >= 100) {
                        console.log(`${this.scanType} In Progress: ${scanStatus}%`);
                        console.log(`${this.scanType} Complete.`);
                        console.log('---------------------------------------');
                        scanCompleted = true;
                        break;
                    }
                    if (previousScanStatus !== scanStatus) {
                        console.log(`${this.scanType} In Progress: ${scanStatus}%`);
                        scanCompleted = false;
                    }

                    previousScanStatus = scanStatus;
                }
                resolve(scanCompleted);
            } catch (error) {
                reject(scanCompleted);
            }
        });
    }

    protected GetScanStatus(scanId: number, scanType: ZapScanType): Promise<number> {
        let zapScanType: string = '';
        const statusOptions: ZapScanStatusOptions = {
            zapapiformat: 'JSON',
            apikey: this.taskInputs.ZapApiKey,
            formMethod: 'GET',
            scanId: scanId
        };

        if (scanType === ZapScanType.Active) { zapScanType = 'ascan'; }
        else if (scanType === ZapScanType.Spider) { zapScanType = 'spider'; }
        else if (scanType === ZapScanType.AjaxSpider) {
            zapScanType = 'ajaxSpider';
        } else if (scanType === ZapScanType.OpenApi) {
            //for openapi there is no state, once the definition is loaded it runs waiting for the scan result.
            return Promise.resolve(100);
        }

        const requestOptions: Request.UriOptions & RequestPromise.RequestPromiseOptions = {
            // tslint:disable-next-line:no-http-string
            uri: `${this.taskInputs.ZapApiUrl}/JSON/${zapScanType}/view/status/`,
            qs: statusOptions
        };
        if (process.env.NODE_ENV !== 'test') {
            console.log(`${this.scanType} | ZAP API Call: ${this.requestOptions.uri} | Request Options: ${JSON.stringify(statusOptions)}`);
        }
        Task.debug(`${this.scanType} | ZAP API Call: ${this.requestOptions.uri} | Request Options: ${JSON.stringify(statusOptions)}`);
        return new Promise<number>((resolve, reject) => {
            RequestPromise(requestOptions)
                .then((res: any) => {
                    let statusNumber;
                    if (scanType === ZapScanType.AjaxSpider) {
                        //doc for ajax spider: 
                        //Gets the current status of the crawler. Actual values are Stopped and Running.
                        const result: ZapAjaxScanStatus = JSON.parse(res);
                        if (result.status.toLowerCase() === Constants.STOPPED_LOWER) {
                            statusNumber = 100;
                        } else {
                            statusNumber = 0;
                        }
                    } else {
                        const result: ZapScanStatus = JSON.parse(res);
                        Task.debug(`${this.scanType} | Status Result: ${JSON.stringify(res)}`);
                        if (process.env.NODE_ENV !== 'test') {
                            console.log(`${this.scanType} | Status Result: ${JSON.stringify(res)}`);
                        }
                        statusNumber = result.status;
                    }
                    resolve(statusNumber);
                })
                .catch((err: any) => {
                    reject(err.message || err);
                });
        });
    }
}