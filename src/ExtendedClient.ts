import { CortiClient as FernClient } from "./Client.js";
import { Auth } from "./api/resources/auth/client/Client.js";

type Options = FernClient.Options;

export class CortiClient extends FernClient {
    constructor(options: Options) {
        super({
            ...options,
            baseUrl: `https://api.${options.environment}.corti.app/v2`
        });
    }

    public get auth(): Auth {
        const authOptions = {
            ...this._options,
            baseUrl: `https://auth.${this._options.environment}.corti.app/realms/${this._options.tenantName}`,
        };

        return (this._auth ??= new Auth(authOptions));
    }
}
