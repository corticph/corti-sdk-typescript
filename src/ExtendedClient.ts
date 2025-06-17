import * as environments from "./environments.js";
import * as core from "./core/index.js";
import { Auth } from "./api/resources/auth/client/ExtendedClient.js";
import { mergeHeaders } from "./core/headers.js";
import { Interactions } from "./api/resources/interactions/client/Client.js";

export declare namespace CortiClient {
    export interface Options {
        environment: core.Supplier<environments.CortiEnvironment | string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: core.Supplier<string>;
        clientId: core.Supplier<string>;
        clientSecret: core.Supplier<string>;
        /** Override the Tenant-Name header */
        tenantName: core.Supplier<string>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | core.Supplier<string | undefined> | undefined>;
    }

    export interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the Tenant-Name header */
        tenantName?: string | undefined;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | core.Supplier<string | undefined> | undefined>;
    }
}

export class CortiClient {
    protected readonly _options: CortiClient.Options;
    private readonly _oauthTokenProvider: core.OAuthTokenProvider;
    protected _interactions: Interactions | undefined;
    protected _auth: Auth | undefined;

    constructor(_options: Omit<CortiClient.Options, 'baseUrl'>) {
        this._options = {
            ..._options,
            baseUrl: `https://api.${_options.environment}.corti.app/v2`,
            headers: mergeHeaders(
                {
                    "Tenant-Name": _options?.tenantName,
                    "X-Fern-Language": "JavaScript",
                    "X-Fern-SDK-Name": "@corti/core",
                    "X-Fern-SDK-Version": "0.0.0-alpha",
                    "User-Agent": "@corti/core/0.0.0-alpha",
                    "X-Fern-Runtime": core.RUNTIME.type,
                    "X-Fern-Runtime-Version": core.RUNTIME.version,
                },
                _options?.headers,
            ),
        };

        this._oauthTokenProvider = new core.OAuthTokenProvider({
            clientId: this._options.clientId,
            clientSecret: this._options.clientSecret,
            authClient: new Auth(this._options),
        });
    }

    public get interactions(): Interactions {
        return (this._interactions ??= new Interactions({
            ...this._options,
            token: async () => await this._oauthTokenProvider.getToken(),
        }));
    }

    public get auth(): Auth {
        return (this._auth ??= new Auth({
            ...this._options,
            token: async () => await this._oauthTokenProvider.getToken(),
        }));
    }
}
