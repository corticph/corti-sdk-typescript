/**
 * RefreshBearerProvider used as a replacement of OAuthTokenProvider, in case when accessToken from outside of library was used instead of Client credentials.
 */

import * as core from "../core/index.js";
import * as api from "../api/index.js";

type RefreshAccessTokenFunction = (refreshToken?: string) => Promise<api.GetTokenResponse> | api.GetTokenResponse;

export type BearerOptions = Partial<Omit<api.GetTokenResponse, 'access_token'>> & {
    refreshAccessToken?: RefreshAccessTokenFunction;
    access_token: core.Supplier<string>;
}

export class RefreshBearerProvider {
    private readonly BUFFER_IN_MINUTES = 2;

    private _accessToken: core.Supplier<string>;
    private _refreshToken: string | undefined;

    private _refreshAccessToken: RefreshAccessTokenFunction | undefined;

    private _expiresAt: Date;
    private _refreshExpiresAt: Date;

    constructor({
        access_token,
        refreshAccessToken,
        refresh_token,
        refresh_expires_in,
        expires_in,
    }: BearerOptions) {
        this._expiresAt = this.getExpiresAt(expires_in, this.BUFFER_IN_MINUTES);
        this._refreshExpiresAt = this.getExpiresAt(refresh_expires_in, 0);

        this._accessToken = access_token;
        this._refreshToken = refresh_token;

        this._refreshAccessToken = refreshAccessToken;
    }

    public async getToken(): Promise<string> {
        if (this._accessToken && this._expiresAt > new Date()) {
            return core.Supplier.get(this._accessToken);
        }

        return this.refresh();
    }

    private async refresh(): Promise<string> {
        if (!this._refreshAccessToken || this._refreshToken && this._refreshExpiresAt < new Date()) {
            return core.Supplier.get(this._accessToken);
        }

        const tokenResponse = await this._refreshAccessToken(this._refreshToken);

        this._accessToken = tokenResponse.access_token;
        this._expiresAt = this.getExpiresAt(tokenResponse.expires_in, this.BUFFER_IN_MINUTES);

        this._refreshToken = tokenResponse.refresh_token;
        this._refreshExpiresAt = this.getExpiresAt(tokenResponse.refresh_expires_in, 0);

        return this._accessToken;
    }

    private getExpiresAt(expiresInSeconds: number = 0, bufferInMinutes: number = this.BUFFER_IN_MINUTES): Date {
        const now = new Date();

        return new Date(now.getTime() + expiresInSeconds * 1000 - bufferInMinutes * 60 * 1000);
    }
}
