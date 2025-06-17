import { Auth as FernAuth } from "./Client.js";
import * as core from "../../../../core/index.js";
import * as Corti from "../../../index.js";
import { mergeHeaders, mergeOnlyDefinedHeaders } from "../../../../core/headers.js";
import * as serializers from "../../../../serialization/index.js";
import urlJoin from "url-join";
import * as errors from "../../../../errors/index.js";

export class Auth extends FernAuth {
    constructor(options: FernAuth.Options) {
        super({
            ...options,
            baseUrl: `https://auth.${options.environment}.corti.app/realms/${options.tenantName}`,
        });
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
        requestOptions?: FernAuth.RequestOptions,
    ): core.HttpResponsePromise<Corti.GetTokenResponse> {
        return core.HttpResponsePromise.fromPromise(this.__getToken_extended(request, requestOptions));
    }

    private async __getToken_extended(
        request: Corti.AuthGetTokenRequest,
        requestOptions?: FernAuth.RequestOptions,
    ): Promise<core.WithRawResponse<Corti.GetTokenResponse>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                (await core.Supplier.get(this._options.environment)),
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
            body: new URLSearchParams({
                ...serializers.AuthGetTokenRequest.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "strip",
                    omitUndefined: true,
                }),
                scope: "openid",
                grant_type: "client_credentials",
            }),
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
}
