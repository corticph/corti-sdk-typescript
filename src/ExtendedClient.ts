import { CortiClient as FernClient } from "./Client.js";
import { Auth } from "./api/resources/auth/client/ExtendedClient.js";

type Options = FernClient.Options;

export class CortiClient extends FernClient {
    constructor(options: Options) {
        super({
            ...options,
            baseUrl: `https://api.${options.environment}.corti.app/v2`
        });
    }

    public get auth(): Auth {
        return (this._auth ??= new Auth(this._options));
    }
}
