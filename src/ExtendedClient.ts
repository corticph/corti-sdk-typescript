import { CortiClient as FernClient } from "./Client.js";

type Options = FernClient.Options;

export class CortiClient extends FernClient {
    constructor(options: Options) {
        super({
            ...options,
            baseUrl: `https://api.${options.environment}.corti.app/v2`
        });
    }
}