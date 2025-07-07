/**
 * Patch: use custom Transcribe implementation to support passing _options parameters to connection function
 */
import { Transcribe as FernTranscribe } from "../api/resources/transcribe/client/Client.js";
import * as core from "../core/index.js";
/**
 * Patch: changed import to custom TranscribeSocket implementation
 */
import { TranscribeSocket } from "./CustomTranscribeSocket.js";

export class Transcribe extends FernTranscribe {
    /**
     * Patch: use custom connect method to support passing _options parameters
     */
    public async connect(args: Omit<FernTranscribe.ConnectArgs, 'token' | 'tenantName'> = {}): Promise<TranscribeSocket> {
        return super.connect({
            ...args,
            token: await this._getAuthorizationHeader() || '',
            tenantName: await core.Supplier.get(this._options.tenantName),
        }) as Promise<TranscribeSocket>;
    }
}
