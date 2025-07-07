/**
 * Patch: use custom Stream implementation to support passing _options parameters to connection function
 */
import { Stream as FernStream } from "../api/resources/stream/client/Client.js";
import * as core from "../core/index.js";
/**
 * Patch: changed import to custom StreamSocket implementation
 */
import { StreamSocket } from "./CustomStreamSocket.js";

export class Stream extends FernStream {
    /**
     * Patch: use custom connect method to support passing _options parameters
     */
    public async connect(args: Omit<FernStream.ConnectArgs, 'token' | 'tenantName'>): Promise<StreamSocket> {
        return super.connect({
            ...args,
            token: await this._getAuthorizationHeader() || '',
            tenantName: await core.Supplier.get(this._options.tenantName),
        }) as Promise<StreamSocket>;
    }
}
