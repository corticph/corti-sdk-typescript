/**
 * BearerProvider used as a replacement of OAuthTokenProvider, in case when BearerAuth was used instead of OAuth2.
 */

import * as core from "../core/index.js";

interface Options {
    accessToken: core.Supplier<string>;
}

export class BearerProvider {
    private _accessToken: core.Supplier<string>;

    constructor(_options: Options) {
        this._accessToken = _options.accessToken;
    }

    public async getToken(): Promise<string> {
        return core.Supplier.get(this._accessToken);
    }
}
