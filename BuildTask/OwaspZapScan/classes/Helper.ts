import * as XmlParser from 'xmljson';

import { AlertResult } from './../interfaces/types/AlertResult';
import { AlertItem, ScanReport, Site } from './../interfaces/types/ZapReport';
import { Constants } from './Constants';

export class Helper {
    constructor() { }

    ProcessAlerts(xmlResult: string, targetUrl: string): AlertResult {
        const high: Array<AlertItem> = new Array<AlertItem>();
        const mid: Array<AlertItem> = new Array<AlertItem>();
        const low: Array<AlertItem> = new Array<AlertItem>();
        const info: Array<AlertItem> = new Array<AlertItem>();

        let alerts: AlertItem[];
        const alertResult: AlertResult = {
            HighAlerts: 0,
            MediumAlerts: 0,
            LowAlerts: 0,
            InformationalAlerts: 0,
            Alerts: new Array<AlertItem>()
        };

        XmlParser.to_json(xmlResult, (err: any, res: any) => {
            if (err || res === undefined) {
                return;
            }
            /* istanbul ignore if */
            if (process.env.NODE_ENV === 'dev') {
                console.log('++++++++++++++++++');
                console.log(res);
                console.log('++++++++++++++++++');
            }

            const reportJson: ScanReport = res;
            const siteCollection: any = reportJson.OWASPZAPReport.site;
            if (reportJson.OWASPZAPReport === undefined || reportJson.OWASPZAPReport.site === undefined || reportJson.OWASPZAPReport.site.length === 0) {
                return;
            }
            const sites: Site[] = Object.keys(siteCollection)[0] === '0' ? siteCollection : [siteCollection as Site];

            for (const idx in sites) {
                if (targetUrl.includes(sites[idx].$.host)) {
                    alerts = sites[idx].alerts.alertitem;
                }
            }

            if (!alerts) {
                return;
            }

            const _alerts: any = alerts;
            alerts = Object.keys(_alerts)[0] === '0' ? _alerts : [_alerts as AlertItem];

            for (const idx of Object.keys(alerts)) {
                const i: number = Number(idx);

                if (alerts[i].riskcode === Constants.HIGH_RISK) {
                    high.push(alerts[i]);
                    alertResult.HighAlerts++;
                }

                if (alerts[i].riskcode === Constants.MEDIUM_RISK) {
                    mid.push(alerts[i]);
                    alertResult.MediumAlerts++;
                }

                if (alerts[i].riskcode === Constants.LOW_RISK) {
                    low.push(alerts[i]);
                    alertResult.LowAlerts++;
                }

                if (alerts[i].riskcode === Constants.INFO_RISK) {
                    info.push(alerts[i]);
                    alertResult.InformationalAlerts++;
                }
            }

            const sorted: Array<AlertItem> = high.concat(mid).concat(low).concat(info);
            alertResult.Alerts = sorted;
        });

        return alertResult;
    }

    ValidateInputsOpenApi(url: string, file: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            let countParams: number = 0;
            let message: string;
            if (url !== '') {
                countParams++;
            }
            if (file !== '') {
                countParams++;
            }
            if (countParams === 0) {
                message = 'You must enter data in URL or File.';
                reject(message);
            } else if (countParams > 1) {
                message = 'Enter data in URL or File. Not both.';
                reject(message);
            }
            resolve(true);
        });
    }
}