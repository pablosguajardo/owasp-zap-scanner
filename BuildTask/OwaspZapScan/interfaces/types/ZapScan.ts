/* ZAP Scan/Result Request Interfaces */
export interface ZapScanOptionsBase {
    zapapiformat: string;
    formMethod: string;
    apikey: string;
}

export interface ZapActiveScanOptions extends ZapScanOptionsBase {
    url: string;
    recurse?: string;
    inScopeOnly?: string;
    scanPolicyName?: string;
    method?: string;
    postData?: string;
    contextId?: string;
}

export interface ZapSpiderScanOptions extends ZapScanOptionsBase {
    url: string;
    maxChildren?: string;
    recurse?: string;
    contextName?: string;
    subtreeOnly?: string;
}

export interface ZapOpenApiUrlScanOptions extends ZapScanOptionsBase {
    url: string;
    hostOverride?: string;
    contextId?: string;
    continueOnUrlError: string;
}

export interface ZapOpenApiFileScanOptions extends ZapScanOptionsBase {
    file: string;
    target?: string;
    contextId?: string;
    continueOnUrlError: string;
}

export interface ZapAjaxSpiderScanOptions extends ZapScanOptionsBase {
    url: string;
    inScope?: boolean;
    contextName?: string;
    subtreeOnly?: boolean;
}
export interface ZapScanStatusOptions extends ZapScanOptionsBase {
    scanId: number;
}
export interface ZapAjaxScanStatusOptions extends ZapScanOptionsBase {

}

export interface ZapScanReportOptions {
    formMethod: string;
    apikey: string;
}

export interface ZapScanStatus {
    status: number;
}
export interface ZapAjaxScanStatus {
    status: string;
}

export interface ZapScanResult {
    scan: number;
    result: string;
}
