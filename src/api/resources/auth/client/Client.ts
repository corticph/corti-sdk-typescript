/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments.js";
import * as core from "../../../../core/index.js";
import * as Corti from "../../../index.js";
import { mergeHeaders, mergeOnlyDefinedHeaders } from "../../../../core/headers.js";
import * as serializers from "../../../../serialization/index.js";
import * as errors from "../../../../errors/index.js";

export declare namespace Auth {
    export interface Options {
        environment: core.Supplier<environments.CortiEnvironment | environments.CortiEnvironmentUrls>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: core.Supplier<string>;
        token?: core.Supplier<core.BearerToken | undefined>;
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

export class Auth {
    protected readonly _options: Auth.Options;

    constructor(_options: Auth.Options) {
        this._options = _options;
    }

    /**
     * Obtain an OAuth2 access token using client credentials
     *
     * @param {Corti.AuthGetTokenRequest} request
     * @param {Auth.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.auth.getToken({
     *         clientId: "client_id",
     *         clientSecret: "client_secret"
     *     })
     */
    public getToken(
        request: Corti.AuthGetTokenRequest,
        requestOptions?: Auth.RequestOptions,
    ): core.HttpResponsePromise<Corti.GetTokenResponse> {
        return core.HttpResponsePromise.fromPromise(this.__getToken(request, requestOptions));
    }

    private async __getToken(
        request: Corti.AuthGetTokenRequest,
        requestOptions?: Auth.RequestOptions,
    ): Promise<core.WithRawResponse<Corti.GetTokenResponse>> {
        const _response = await core.fetcher({
            url: core.url.join(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)).login,
                "protocol/openid-connect/token",
            ),
            method: "POST",
            headers: mergeHeaders(
                this._options?.headers,
                mergeOnlyDefinedHeaders({
                    Authorization: await this._getAuthorizationHeader(),
                    "Tenant-Name": requestOptions?.tenantName,
                }),
                requestOptions?.headers,
            ),
            contentType: "application/x-www-form-urlencoded",
            requestType: "json",
            body: {
                ...serializers.AuthGetTokenRequest.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true,
                }),
                scope: "openid",
                grant_type: "client_credentials",
            },
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return {
                data: serializers.GetTokenResponse.parseOrThrow(_response.body, {
                    unrecognizedObjectKeys: "passthrough",
                    allowUnrecognizedUnionMembers: true,
                    allowUnrecognizedEnumValues: true,
                    skipValidation: true,
                    breadcrumbsPrefix: ["response"],
                }),
                rawResponse: _response.rawResponse,
            };
        }

        if (_response.error.reason === "status-code") {
            throw new errors.CortiError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
                rawResponse: _response.rawResponse,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.CortiError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                    rawResponse: _response.rawResponse,
                });
            case "timeout":
                throw new errors.CortiTimeoutError(
                    "Timeout exceeded when calling POST /protocol/openid-connect/token.",
                );
            case "unknown":
                throw new errors.CortiError({
                    message: _response.error.errorMessage,
                    rawResponse: _response.rawResponse,
                });
        }
    }

    protected async _getAuthorizationHeader(): Promise<string | undefined> {
        const bearer = await core.Supplier.get(this._options.token);
        if (bearer != null) {
            return `Bearer ${bearer}`;
        }

        return undefined;
    }
}
