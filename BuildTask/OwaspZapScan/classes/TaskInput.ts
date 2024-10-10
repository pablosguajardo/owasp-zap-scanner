export class TaskInput {
    /* Required */
    private _zapApiKey: string;
    set ZapApiKey(value: string) {
        this._zapApiKey = value;
    }

    get ZapApiKey(): string {
        if (this._zapApiKey) {
            return this._zapApiKey;
        }
        /* istanbul ignore next */
        throw new Error('The ZAP API Key is required but not set.');
    }


    private _zapApiUrl: string;
    set ZapApiUrl(value: string) {
        this._zapApiUrl = value;
    }

    get ZapApiUrl(): string {
        if (this._zapApiUrl) {
            return this._zapApiUrl;
        }
        /* istanbul ignore next */
        throw new Error('The ZAP API URL is required but not set.');
    }


    private _targetUrl: string;
    set TargetUrl(value: string) {
        this._targetUrl = value;
    }

    get TargetUrl(): string {
        if (this._targetUrl) {
            return this._targetUrl;
        }
        /* istanbul ignore next */
        throw new Error('The Target URL is required but not set.');
    }

    private _newContext: boolean;
    set NewContext(value: boolean) {
        this._newContext = value;
    }

    get NewContext(): boolean {
        if (this._newContext) {
            return this._newContext;
        }
        return false;
    }

    private _clearSession: boolean;
    set ClearSession(value: boolean) {
        this._clearSession = value;
    }

    get ClearSession(): boolean {
        if (this._clearSession) {
            return this._clearSession;
        }
        return false;
    }

    private _newContextName: string;
    set NewContextName(value: string) {
        this._newContextName = value;
    }

    get NewContextName(): string {
        if (this._newContextName) {
            return this._newContextName;
        }
        return '';
    }

    /* Context config */

    private _showTechnologyListConfig: boolean;
    set ShowTechnologyListConfig(value: boolean) {
        this._showTechnologyListConfig = value;
    }
    get ShowTechnologyListConfig(): boolean {
        if (this._showTechnologyListConfig) {
            return this._showTechnologyListConfig;
        }
        return false;
    }

    private _includeAllContextTechnologiesConfig: boolean;
    set IncludeAllContextTechnologiesConfig(value: boolean) {
        this._includeAllContextTechnologiesConfig = value;
    }
    get IncludeAllContextTechnologiesConfig(): boolean {
        if (this._includeAllContextTechnologiesConfig) {
            return this._includeAllContextTechnologiesConfig;
        }
        return false;
    }

    private _showContextListConfig: boolean;
    set ShowContextListConfig(value: boolean) {
        this._showContextListConfig = value;
    }
    get ShowContextListConfig(): boolean {
        if (this._showContextListConfig) {
            return this._showContextListConfig;
        }
        return false;
    }

    private _excludeFromContextConfig: string;
    set ExcludeFromContextConfig(value: string) {
        this._excludeFromContextConfig = value;
    }
    get ExcludeFromContextConfig(): string {
        if (this._excludeFromContextConfig) {
            return this._excludeFromContextConfig;
        }
        return '';
    }

    private _includeInContextConfig: string;
    set IncludeInContextConfig(value: string) {
        this._includeInContextConfig = value;
    }
    get IncludeInContextConfig(): string {
        if (this._includeInContextConfig) {
            return this._includeInContextConfig;
        }
        return '';
    }

    private _contextNameConfig: string;
    set ContextNameConfig(value: string) {
        this._contextNameConfig = value;
    }
    get ContextNameConfig(): string {
        if (this._contextNameConfig) {
            return this._contextNameConfig;
        }
        return '';
    }

    
    private _contextNameRemoveConfig: string;
    set ContextNameRemoveConfig(value: string) {
        this._contextNameRemoveConfig = value;
    }
    get ContextNameRemoveConfig(): string {
        if (this._contextNameRemoveConfig) {
            return this._contextNameRemoveConfig;
        }
        return '';
    }
    
    /* Open Api Scan */
    private _executeOpenApiScan: boolean;
    set ExecuteOpenApiScan(value: boolean) {
        this._executeOpenApiScan = value;
    }

    get ExecuteOpenApiScan(): boolean {
        if (this._executeOpenApiScan) {
            return this._executeOpenApiScan;
        }
        return false;
    }

    private _openApiFile: string;
    set OpenApiFile(value: string) {
        this._openApiFile = value;
    }

    get OpenApiFile(): string {
        if (this._openApiFile) {
            return this._openApiFile;
        }
        return '';
    }

    private _openApiUrl: string;
    set OpenApiUrl(value: string) {
        this._openApiUrl = value;
    }

    get OpenApiUrl(): string {
        if (this._openApiUrl) {
            return this._openApiUrl;
        }
        return '';
    }

    private _openApiHostOverride: string;
    set OpenApiHostOverride(value: string) {
        this._openApiHostOverride = value;
    }

    get OpenApiHostOverride(): string {
        if (this._openApiHostOverride) {
            return this._openApiHostOverride;
        }
        return '';
    }

    private _openApiContextId: string;
    set OpenApiContextId(value: string) {
        this._openApiContextId = value;
    }
    get OpenApiContextId(): string {
        if (this._openApiContextId) {
            return this._openApiContextId;
        }
        return '';
    }


    private _continueOnUrlError: string;
    set ContinueOnUrlError(value: string) {
        this._continueOnUrlError = value;
    }
    get ContinueOnUrlError(): string {
        if (this._continueOnUrlError) {
            return this._continueOnUrlError;
        }
        return 'No';
    }
    /* End Open Api Scan */

    /* Ajax Spider Scan */
    private _executeAjaxSpiderScan: boolean;
    set ExecuteAjaxSpiderScan(value: boolean) {
        this._executeAjaxSpiderScan = value;
    }

    get ExecuteAjaxSpiderScan(): boolean {
        if (this._executeAjaxSpiderScan) {
            return this._executeAjaxSpiderScan;
        }
        return false;
    }

    private _ajaxSubTreeOnly: boolean;
    set AjaxSubTreeOnly(value: boolean) {
        this._ajaxSubTreeOnly = value;
    }

    get AjaxSubTreeOnly(): boolean {
        if (this._ajaxSubTreeOnly) {
            return this._ajaxSubTreeOnly;
        }
        return false;
    }

    private _ajaxContextName: string;
    set AjaxContextName(value: string) {
        this._ajaxContextName = value;
    }

    get AjaxContextName(): string {
        if (this._ajaxContextName) {
            return this._ajaxContextName;
        }
        return '';
    }

    private _ajaxInScope: boolean;
    set AjaxInScope(value: boolean) {
        this._ajaxInScope = value;
    }

    get AjaxInScope(): boolean {
        if (this._ajaxInScope) {
            return this._ajaxInScope;
        }
        return false;
    }
    /* End Ajax Spider Scan*/

    /* Spider Scan */
    private _executeSpiderScan: boolean;
    set ExecuteSpiderScan(value: boolean) {
        this._executeSpiderScan = value;
    }

    get ExecuteSpiderScan(): boolean {
        if (this._executeSpiderScan) {
            return this._executeSpiderScan;
        }
        return false;
    }

    private _recurseSpider: boolean;
    set RecurseSpider(value: boolean) {
        this._recurseSpider = value;
    }

    get RecurseSpider(): boolean {
        if (this._recurseSpider) {
            return this._recurseSpider;
        }
        return false;
    }


    private _subTreeOnly: boolean;
    set SubTreeOnly(value: boolean) {
        this._subTreeOnly = value;
    }

    get SubTreeOnly(): boolean {
        if (this._subTreeOnly) {
            return this._subTreeOnly;
        }
        return false;
    }


    private _maxChildrenToCrawl: string;
    set MaxChildrenToCrawl(value: string) {
        this._maxChildrenToCrawl = value;
    }

    get MaxChildrenToCrawl(): string {
        if (this._maxChildrenToCrawl) {
            return this._maxChildrenToCrawl;
        }
        return '';
    }


    private _contextName: string;
    set ContextName(value: string) {
        this._contextName = value;
    }

    get ContextName(): string {
        if (this._contextName) {
            return this._contextName;
        }
        return '';
    }


    /* Active Scan */
    private _executeActiveScan: boolean;
    set ExecuteActiveScan(value: boolean) {
        this._executeActiveScan = value;
    }

    get ExecuteActiveScan(): boolean {
        if (this._executeActiveScan) {
            return this._executeActiveScan;
        }
        return false;
    }


    private _contextId: string;
    set ContextId(value: string) {
        this._contextId = value;
    }

    get ContextId(): string {
        if (this._contextId) {
            return this._contextId;
        }
        return '';
    }


    private _recurse: boolean;
    set Recurse(value: boolean) {
        this._recurse = value;
    }

    get Recurse(): boolean {
        if (this._recurse) {
            return this._recurse;
        }
        return false;
    }


    private _inScopeOnly: boolean;
    set InScopeOnly(value: boolean) {
        this._inScopeOnly = value;
    }

    get InScopeOnly(): boolean {
        if (this._inScopeOnly) {
            return this._inScopeOnly;
        }
        return false;
    }


    private _scanPolicyName: string;
    set ScanPolicyName(value: string) {
        this._scanPolicyName = value;
    }

    get ScanPolicyName(): string {
        if (this._scanPolicyName) {
            return this._scanPolicyName;
        }
        return '';
    }


    private _method: string;
    set Method(value: string) {
        this._method = value;
    }

    get Method(): string {
        if (this._method) {
            return this._method;
        }
        return '';
    }


    private _postData: string;
    set PostData(value: string) {
        this._postData = value;
    }

    get PostData(): string {
        if (this._postData) {
            return this._postData;
        }
        return '';
    }



    /* Reporting */
    private _reportType: string;
    set ReportType(value: string) {
        this._reportType = value;
    }

    get ReportType(): string {
        if (this._reportType) {
            return this._reportType;
        }
        return '';
    }


    private _reportFileDestination: string;
    set ReportFileDestination(value: string) {
        this._reportFileDestination = value;
    }

    get ReportFileDestination(): string {
        if (this._reportFileDestination) {
            return this._reportFileDestination;
        }
        return '';
    }


    private _reportFileName: string;
    set ReportFileName(value: string) {
        this._reportFileName = value;
    }

    get ReportFileName(): string {
        if (this._reportFileName) {
            return this._reportFileName;
        }
        return '';
    }


    private _projectName: string;
    set ProjectName(value: string) {
        this._projectName = value;
    }

    get ProjectName(): string {
        if (this._projectName) {
            return this._projectName;
        }
        return '';
    }


    private _buildDefinitionName: string;
    set BuildDefinitionName(value: string) {
        this._buildDefinitionName = value;
    }

    get BuildDefinitionName(): string {
        if (this._buildDefinitionName) {
            return this._buildDefinitionName;
        }
        return '';
    }



    /* Verification */
    private _enableVerifications: boolean;
    set EnableVerifications(value: boolean) {
        this._enableVerifications = value;
    }

    get EnableVerifications(): boolean {
        if (this._enableVerifications) {
            return this._enableVerifications;
        }
        return false;
    }


    private _maxHighRiskAlerts: number;
    set MaxHighRiskAlerts(value: number) {
        this._maxHighRiskAlerts = value;
    }

    get MaxHighRiskAlerts(): number {
        if (this._maxHighRiskAlerts) {
            return this._maxHighRiskAlerts;
        }
        return 0;
    }


    private _maxMediumRiskAlerts: number;
    set MaxMediumRiskAlerts(value: number) {
        this._maxMediumRiskAlerts = value;
    }

    get MaxMediumRiskAlerts(): number {
        if (this._maxMediumRiskAlerts) {
            return this._maxMediumRiskAlerts;
        }
        return 0;
    }


    private _maxLowRiskAlerts: number;
    set MaxLowRiskAlerts(value: number) {
        this._maxLowRiskAlerts = value;
    }

    get MaxLowRiskAlerts(): number {
        if (this._maxLowRiskAlerts) {
            return this._maxLowRiskAlerts;
        }
        return 0;
    }
}
