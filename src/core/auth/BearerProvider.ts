import * as core from "../../core/index.js";

export class BearerProvider {
    private _accessToken: core.Supplier<string>;

    constructor({
        accessToken,
    }: {
        accessToken: core.Supplier<string>;
    }) {
        this._accessToken = accessToken;
    }

    public async getToken(): Promise<string> {
        return core.Supplier.get(this._accessToken);
    }
}
