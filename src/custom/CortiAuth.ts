/**
 * This file is implementation of the Auth client that can be used in 2 scenarios:
 * 1. Under the hood by the package when Client credentials are used
 * 2. Directly imported by the user to implement Authorization code flow
 *
 * Locally based on the auto-generated Auth client (src/api/resources/auth/client/Client.ts), but with some changes:
 * 1. Token request sends proper `application/x-www-form-urlencoded` content type instead of `application/json`
 * 2. Token request accepts additional parameters to support Authorization code flow
 * 3. Additional methods to support Authorization code flow
 *
 * All methods are re-implemented, but class still extends the auto-generated one to make sure that we keep the same interface
 *  and to maybe remove some of the re-implementations in the future when `x-www-form-urlencoded` is supported
 */

import { Auth as FernAuth } from "../api/resources/auth/client/Client.js";
import * as core from "../core/index.js";
import * as Corti from "../api/index.js";
import { mergeHeaders, mergeOnlyDefinedHeaders } from "../core/headers.js";
import urlJoin from "url-join";
import * as errors from "../errors/index.js";
import * as environments from "../environments.js";

interface AuthorizationCodeClient {
    client_id: string;
    redirect_uri: string;
}

interface AuthorizationCodeServer {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    code: string;
}

interface AuthorizationRefreshServer {
    client_id: string;
    client_secret: string;
    refresh_token: string;
}

interface Options {
    skipRedirect?: boolean;
}

export class Auth extends FernAuth {
    /**
     * Patch: called custom implementation this.__getToken_custom instead of this.__getToken
     */
    public getToken(
        request: Corti.AuthGetTokenRequest,
        requestOptions?: FernAuth.RequestOptions,
    ): core.HttpResponsePromise<Corti.GetTokenResponse> {
        return core.HttpResponsePromise.fromPromise(this.__getToken_custom(request, requestOptions));
    }

    /**
     * Patch: added method to get Authorization URL for Authorization code flow
     */
    public async authorizeURL({
        client_id,
        redirect_uri,
    }: AuthorizationCodeClient, options?: Options): Promise<string> {
        const authUrl = new URL(urlJoin(
            (await core.Supplier.get(this._options.baseUrl)) ??
            ((await core.Supplier.get(this._options.environment)) ?? environments.CortiEnvironment.BetaEu)
                .login,
            await core.Supplier.get(this._options.tenantName),
            "protocol/openid-connect/auth",
        ));

        authUrl.searchParams.set('response_type', 'code');
        authUrl.searchParams.set('scope', 'openid profile');

        if (client_id !== undefined) {
            authUrl.searchParams.set('client_id', client_id);
        }

        if (redirect_uri !== undefined) {
            authUrl.searchParams.set('redirect_uri', redirect_uri);
        }

        const authUrlString = authUrl.toString();

        if (typeof window !== "undefined" && !options?.skipRedirect) {
            window.location.href = authUrlString;
            return authUrlString;
        }

        return authUrlString;
    }

    /**
     * Patch: calls __getToken_custom with additional fields to support Authorization code flow
     */
    public getCodeFlowToken(
        request: AuthorizationCodeServer,
        requestOptions?: FernAuth.RequestOptions,
    ): core.HttpResponsePromise<Corti.GetTokenResponse> {
        return core.HttpResponsePromise.fromPromise(this.__getToken_custom({
            ...request,
            grant_type: "authorization_code",
        }, requestOptions));
    }

    /**
     * Patch: copy of this.__getToken with patches
     */
    private async __getToken_custom(
        /**
         * Patch: added additional fields to request to support Authorization code flow
         */
        request: Corti.AuthGetTokenRequest & Partial<{
            grant_type: "client_credentials" | "authorization_code" | "refresh_token";
            code: string;
            redirect_uri: string;
            refresh_token: string;
        }>,
        requestOptions?: FernAuth.RequestOptions,
    ): Promise<core.WithRawResponse<Corti.GetTokenResponse>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                (await core.Supplier.get(this._options.environment)).login,
                /**
                 * Patch: use tenantName as path parameter
                 *  (consider to be generated from the spec in the future)
                 */
                await core.Supplier.get(this._options.tenantName),
                "protocol/openid-connect/token",
            ),
            method: "POST",
            headers: mergeHeaders(
                this._options?.headers,
                mergeOnlyDefinedHeaders({
                    /**
                     * Patch: Removed `Authorization` header, as it is not needed for getting the token
                     */
                    "Tenant-Name": requestOptions?.tenantName,
                }),
                requestOptions?.headers,
            ),
            contentType: "application/x-www-form-urlencoded",
            /**
             * Patch: removed `requestType: "json"`, made body a URLSearchParams object
             */
            body: new URLSearchParams({
                ...request,
                scope: "openid",
                /**
                 * Patch: `grant_type` uses values from request or defaults to "client_credentials"
                 */
                grant_type: request.grant_type || "client_credentials",
                /**
                 * Patch: added `code` and `redirect_uri` fields for Authorization code flow
                 * Patch: added `refresh_token` field for Refresh token flow
                 */
                ...(request.grant_type === "authorization_code"
                    ? {
                        code: request.code,
                        redirect_uri: request.redirect_uri
                    }
                    : {}),
                ...(request.grant_type === "refresh_token"
                    ? {
                        refresh_token: request.refresh_token,
                    }
                    : {}
                ),
            }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return { data: _response.body as Corti.GetTokenResponse, rawResponse: _response.rawResponse };
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

    /**
     * Patch: calls __getToken_custom with additional fields to support Refresh token flow
     */
    public refreshToken(
        request: AuthorizationRefreshServer,
        requestOptions?: FernAuth.RequestOptions,
    ): core.HttpResponsePromise<Corti.GetTokenResponse> {
        return core.HttpResponsePromise.fromPromise(this.__getToken_custom({
            ...request,
            grant_type: "refresh_token",
        }, requestOptions));
    }
}
