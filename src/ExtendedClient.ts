import * as environments from "./environments.js";
import * as core from "./core/index.js";
// Patch (!)
import { Auth } from "./api/resources/auth/client/ExtendedClient.js";
import { mergeHeaders } from "./core/headers.js";
import { Interactions } from "./api/resources/interactions/client/Client.js";
import { Recordings } from "./api/resources/recordings/client/Client";

export declare namespace CortiClient {
    interface ClientCredentials {
        clientId: core.Supplier<string>;
        clientSecret: core.Supplier<string>;
    }

    interface Bearer {
        accessToken: core.Supplier<string>;
    }

    export interface Options {
        environment: core.Supplier<environments.CortiEnvironment | string>;
        /** Override the Tenant-Name header */
        tenantName: core.Supplier<string>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | core.Supplier<string | undefined> | undefined>;

        auth: ClientCredentials | Bearer;
    }

    // Patch (!) : renamed Options
    interface InternalOptions {
        environment: core.Supplier<environments.CortiEnvironment | string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: core.Supplier<string>;
        clientId?: core.Supplier<string>;
        clientSecret?: core.Supplier<string>;
        token?: core.Supplier<string>;
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
    protected readonly _options: CortiClient.InternalOptions;
    // Patch (!)
    private readonly _oauthTokenProvider: core.OAuthTokenProvider | core.BearerProvider;
    protected _interactions: Interactions | undefined;
    protected _auth: Auth | undefined;
    protected _recordings: Recordings | undefined;

    constructor(_options: CortiClient.Options) {
        this._options = {
            ..._options,
            // Patch (!)
            baseUrl: `https://api.${_options.environment}.corti.app/v2`,
            clientId: "clientId" in _options.auth ? _options.auth.clientId : undefined,
            clientSecret: "clientSecret" in _options.auth ? _options.auth.clientSecret : undefined,
            token: "accessToken" in _options.auth ? _options.auth.accessToken : undefined,
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

        // Patch (!)
        this._oauthTokenProvider = "accessToken" in _options.auth ?
            new core.BearerProvider({
                accessToken: _options.auth.accessToken,
            }) :
            new core.OAuthTokenProvider({
                clientId: this._options.clientId!,
                clientSecret: this._options.clientSecret!,
                authClient: new Auth(this._options),
            });
    }

    public get interactions(): Interactions {
        return (this._interactions ??= new Interactions({
            ...this._options,
            token: async () => await this._oauthTokenProvider.getToken(),
        }));
    }

    public get recordings(): Recordings {
        return (this._recordings ??= new Recordings({
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
