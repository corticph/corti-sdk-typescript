/**
 * This file is the custom implementation of the main CortiClient class (src/Client.ts)
 *
 * It's (almost) handwritten, and it replaces the auto-generated version, and here is why:
 *
 * 1. The auto-generated version uses direct client imports -> we can not always easily replace them without a patch in Main client
 * 2. The auto-generated version produces TypeScript error when initializes authClient in `_oauthTokenProvider`
 * 3. `_oauthTokenProvider` is a private field in the auto-generated version,
 *   so we cannot easily rewrite it in the custom implementation. We can use another field for OAuthProvider,
 *   but then we need to rewrite all the methods anyway => it will be easier to forget,
 *   since it would exist in the class, but not properly implemented
 *
 * => Must be manually synced with src/Client.ts (which is auto-generated).
 *
 * All the patches marked with `// Patch: ...` comments.
 */

import * as environments from "./environments.js";
import * as core from "../core/index.js";
import { Auth } from "../api/resources/auth/client/Client.js";
import { mergeHeaders } from "../core/headers.js";
import { Interactions } from "../api/resources/interactions/client/Client.js";
import { Recordings } from "../api/resources/recordings/client/Client.js";

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
        tenantName?: string;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | core.Supplier<string | undefined> | undefined>;
    }
}

export class CortiClient {
    protected readonly _options: CortiClient.Options;
    private readonly _oauthTokenProvider: core.OAuthTokenProvider;
    protected _interactions: Interactions | undefined;
    protected _recordings: Recordings | undefined;
    /**
     * Patch: removed `auth` field
     * `_oauthTokenProvider` uses Auth module directly to get the token,
     *   and our client also don't need to use it within the main client.
     *   For other cases they can use `CortiAuth` module directly.
     */

    constructor(_options: CortiClient.Options) {
        this._options = {
            ..._options,
            headers: mergeHeaders(
                {
                    "Tenant-Name": _options?.tenantName,
                    "X-Fern-Language": "JavaScript",
                    "X-Fern-SDK-Name": "@corti/core",
                    "X-Fern-SDK-Version": "0.0.0-alpha.2",
                    "User-Agent": "@corti/core/0.0.0-alpha.2",
                    "X-Fern-Runtime": core.RUNTIME.type,
                    "X-Fern-Runtime-Version": core.RUNTIME.version,
                },
                _options?.headers,
            ),
        };

        this._oauthTokenProvider = new core.OAuthTokenProvider({
            clientId: this._options.clientId,
            clientSecret: this._options.clientSecret,
            /**
             * Patch: provide whole `option` object to the Auth client, since it depends on both tenantName and environment
             */
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

    /**
     * Patch: removed `auth` getter
     */
}
