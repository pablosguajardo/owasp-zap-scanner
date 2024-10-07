import { TaskInput } from './TaskInput';
import * as RequestPromise from 'request-promise';
import * as Request from 'request';
import * as Task from 'vsts-task-lib';

export class ZapApiHelper {
    protected taskInputs: TaskInput;

    constructor(taskInputs: TaskInput) {
        this.taskInputs = taskInputs;
    }

    ClearZapSession(): Promise<number> {
        const statusOptions = {
            zapapiformat: 'JSON',
            apikey: this.taskInputs.ZapApiKey,
            formMethod: 'GET'
        };

        const requestOptions: Request.UriOptions & RequestPromise.RequestPromiseOptions = {
            // tslint:disable-next-line:no-http-string
            uri: `${this.taskInputs.ZapApiUrl}/JSON/core/action/newSession/`,
            qs: statusOptions
        };

        console.log('Clearing Zap Session...');
        Task.debug(`ZAP API Call: ${requestOptions.uri} | Request Options: ${JSON.stringify(statusOptions)}`);
        return new Promise<number>((resolve, reject) => {
            RequestPromise(requestOptions)
                .then((res: any) => {
                    const result = JSON.parse(res);

                    console.log('Successfully cleared Zap Session');
                    Task.debug(`Status Result: ${JSON.stringify(res)}`);
                    resolve(result.status);
                })
                .catch((err: any) => {
                    reject(err.message || err);
                });
        });
    }

    ///JSON/context/view/contextList/?apikey=$apikey
    ShowContextListConfig(): Promise<number> {
        const statusOptions = {
            zapapiformat: 'JSON',
            apikey: this.taskInputs.ZapApiKey,
            formMethod: 'GET'
        };

        const requestOptions: Request.UriOptions & RequestPromise.RequestPromiseOptions = {
            uri: `${this.taskInputs.ZapApiUrl}/JSON/core/action/contextList/`,
            qs: statusOptions
        };

        console.log('Show context list...');
        Task.debug(`ZAP API Call: ${requestOptions.uri} | Request Options: ${JSON.stringify(statusOptions)}`);
        return new Promise<number>((resolve, reject) => {
            RequestPromise(requestOptions)
                .then((res: any) => {
                    const result = JSON.parse(res);

                    console.log('Successfully get list:');
                    console.log(`${JSON.stringify(res.Content)}`);
                    Task.debug(`Status Result: ${JSON.stringify(res)}`);
                    resolve(result.status);
                })
                .catch((err: any) => {
                    reject(err.message || err);
                });
        });
    }

    ///JSON/context/action/includeAllContextTechnologies/?contextName=$contextName&apikey=$apikey"
    IncludeAllContextTechnologiesConfig(): Promise<number> {
        const statusOptions = {
            zapapiformat: 'JSON',
            apikey: this.taskInputs.ZapApiKey,
            contextName: this.taskInputs.ContextNameConfig,
            formMethod: 'GET'
        };

        const requestOptions: Request.UriOptions & RequestPromise.RequestPromiseOptions = {
            // tslint:disable-next-line:no-http-string
            uri: `${this.taskInputs.ZapApiUrl}/JSON/core/action/includeAllContextTechnologies/`,
            qs: statusOptions
        };

        console.log('Include all context technologies...');
        Task.debug(`ZAP API Call: ${requestOptions.uri} | Request Options: ${JSON.stringify(statusOptions)}`);
        return new Promise<number>((resolve, reject) => {
            RequestPromise(requestOptions)
                .then((res: any) => {
                    const result = JSON.parse(res);

                    console.log('Successfully Include all context technologies');
                    Task.debug(`Status Result: ${JSON.stringify(res)}`);
                    resolve(result.status);
                })
                .catch((err: any) => {
                    reject(err.message || err);
                });
        });
    }
    
    //JSON/context/view/technologyList/?apikey=$apikey
    ShowTechnologyListConfig(): Promise<number> {
        const statusOptions = {
            zapapiformat: 'JSON',
            apikey: this.taskInputs.ZapApiKey,
            formMethod: 'GET'
        };

        const requestOptions: Request.UriOptions & RequestPromise.RequestPromiseOptions = {
            uri: `${this.taskInputs.ZapApiUrl}/JSON/core/action/technologyList/`,
            qs: statusOptions
        };

        console.log('Show technology list...');
        Task.debug(`ZAP API Call: ${requestOptions.uri} | Request Options: ${JSON.stringify(statusOptions)}`);
        return new Promise<number>((resolve, reject) => {
            RequestPromise(requestOptions)
                .then((res: any) => {
                    const result = JSON.parse(res);

                    console.log('Successfully get list:');
                    console.log(`${JSON.stringify(res.Content)}`);
                    Task.debug(`Status Result: ${JSON.stringify(res)}`);
                    resolve(result.status);
                })
                .catch((err: any) => {
                    reject(err.message || err);
                });
        });
    }
    ExcludeFromContextConfig(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const arrRegex = this.taskInputs.ExcludeFromContextConfig.split(',');
            let resNumberStatus: number = 0;
            arrRegex.forEach(itemRegex => {
                console.log(`Exclude regex: ${itemRegex} from context: ${this.taskInputs.ContextNameConfig}`);
                const statusOptions = {
                    zapapiformat: 'JSON',
                    apikey: this.taskInputs.ZapApiKey,
                    contextName: this.taskInputs.ContextNameConfig,
                    regex: itemRegex,
                    formMethod: 'GET'
                };

                const requestOptions: Request.UriOptions & RequestPromise.RequestPromiseOptions = {
                    uri: `${this.taskInputs.ZapApiUrl}/JSON/core/action/excludeFromContext/`,
                    qs: statusOptions
                };

                Task.debug(`ZAP API Call: ${requestOptions.uri} | Request Options: ${JSON.stringify(statusOptions)}`);

                RequestPromise(requestOptions)
                    .then((res: any) => {
                        const result = JSON.parse(res);
                        console.log('Successfully exclude regex from context.');
                        Task.debug(`Status Result: ${JSON.stringify(res)}`);
                        resNumberStatus = result.status;
                    })
                    .catch((err: any) => {
                        reject(err.message || err);
                    });
            });
            resolve(resNumberStatus);
        });
    }

    IncludeInContextConfig(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const arrRegex = this.taskInputs.IncludeInContextConfig.split(',');
            let resNumberStatus: number = 0;
            arrRegex.forEach(itemRegex => {
                console.log(`Add regex: ${itemRegex} in context: ${this.taskInputs.ContextNameConfig}`);
                const statusOptions = {
                    zapapiformat: 'JSON',
                    apikey: this.taskInputs.ZapApiKey,
                    contextName: this.taskInputs.ContextNameConfig,
                    regex: itemRegex,
                    formMethod: 'GET'
                };

                const requestOptions: Request.UriOptions & RequestPromise.RequestPromiseOptions = {
                    uri: `${this.taskInputs.ZapApiUrl}/JSON/core/action/includeInContext/`,
                    qs: statusOptions
                };

                Task.debug(`ZAP API Call: ${requestOptions.uri} | Request Options: ${JSON.stringify(statusOptions)}`);

                RequestPromise(requestOptions)
                    .then((res: any) => {
                        const result = JSON.parse(res);
                        console.log('Successfully added regex to context.');
                        Task.debug(`Status Result: ${JSON.stringify(res)}`);
                        resNumberStatus = result.status;
                    })
                    .catch((err: any) => {
                        reject(err.message || err);
                    });
            });
            resolve(resNumberStatus);
        });
    }

    CreateNewContext(nameContext: string): Promise<number> {
        const statusOptions = {
            zapapiformat: 'JSON',
            apikey: this.taskInputs.ZapApiKey,
            formMethod: 'GET',
            contextName: nameContext
        };

        const requestOptions: Request.UriOptions & RequestPromise.RequestPromiseOptions = {
            // tslint:disable-next-line:no-http-string
            uri: `${this.taskInputs.ZapApiUrl}/JSON/context/action/newContext/`,
            qs: statusOptions
        };
        //Example: /JSON/context/action/newContext/?apikey=1234&contextName=micontexto
        console.log('Create new Zap context...');
        Task.debug(`ZAP API Call: ${requestOptions.uri} | Request Options: ${JSON.stringify(statusOptions)}`);
        return new Promise<number>((resolve, reject) => {
            RequestPromise(requestOptions)
                .then((res: any) => {
                    const result = JSON.parse(res);
                    //ej: existe: {"code":"already_exists","message":"Ya Existe"}
                    //ej: ok: {"contextId":"2"}
                    Task.debug(`Status Result: ${JSON.stringify(res)}`);
                    if (result.contextId !== undefined) {
                        console.log(`Successfully: The new Zap context ${nameContext} was created. Id: [${result.contextId}]`);
                        resolve(result.contextId);
                    } else if (result.message !== undefined) {
                        const message: string = `ERROR creating the new context ${nameContext}: ${result.message}`;
                        reject(message);
                    } else {
                        const message: string = `Context ${nameContext} could not be created.`;
                        reject(message);
                    }
                })
                .catch((err: any) => {
                    reject(err.message || err);
                });
        });
    }
}