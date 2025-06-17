import { Auth as FernAuth } from "./Client.js";

export class Auth extends FernAuth {
    constructor(options: FernAuth.Options) {
        super({
            ...options,
            baseUrl: `https://auth.${options.environment}.corti.app/realms/${options.tenantName}`,
        });
    }
}
