export class Constants {
    /* Report Endpoints */
    static HTML_REPORT: string = 'htmlreport';
    static XML_REPORT: string = 'xmlreport';
    static MD_REPORT: string = 'mdreport';
    static ALL_REPORT: string = 'allreport';

    /* Report Types */
    static HTML: string = 'html';
    static XML: string = 'xml';
    static MARKDOWN: string = 'md';
    static ALL: string = 'all';
    static HTMLORIG: string = 'Orig.html';

    /* Risk Code */
    static HIGH_RISK: string = '3';
    static MEDIUM_RISK: string = '2';
    static LOW_RISK: string = '1';
    static INFO_RISK: string = '0';


    /* Report Names */
    static AJAX_SPIDER_SCAN_NAME: string =  'Ajax Spider Scan';
    static ACTIVE_SCAN_NAME: string = 'Active Scan';
    static SPIDER_SCAN_NAME: string = 'Spider Scan';
    static OPENAPI_URL_SCAN_NAME: string = 'Open Api Scan from url';
    static OPENAPI_FILE_SCAN_NAME: string = 'Open Api Scan from file';
    
    /* Ajax spider status */
    static STOPPED_LOWER: string =  'stopped';
    static RUNNING_LOWER: string = 'running';
}