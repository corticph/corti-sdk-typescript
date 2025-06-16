import { CortiClient as FernClient } from "./Client.js";

type Options = Omit<FernClient.Options, 'environment'> & {
    environment: 'beta-eu' | 'us' | 'eu' | string;
};

export class CortiClient extends FernClient {
    constructor(options: Options) {
        super({
            ...options,
            baseUrl: `https://api.${options.environment}.corti.app/v2`
        });
    }
}