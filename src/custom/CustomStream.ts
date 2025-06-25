/**
 * Patch: use custom Stream implementation to support passing _options parameters to connection function
 */
import { Stream as FernStream } from "../api/resources/stream/client/Client.js";
import { Supplier } from "../core/index.js";

export class Stream extends FernStream {
    public async connect(args: Omit<FernStream.ConnectArgs, 'token' | 'tenantName'>) {
        return super.connect({
            ...args,
            token: await this._getAuthorizationHeader(),
            tenantName: await Supplier.get(this._options.tenantName),
        });
    }
}
