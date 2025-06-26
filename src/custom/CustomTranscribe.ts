/**
 * Patch: use custom Transcribe implementation to support passing _options parameters to connection function
 */
import { Transcribe as FernTranscribe } from "../api/resources/transcribe/client/Client.js";
import * as core from "../core/index.js";
import { TranscribeSocket } from "../api/resources/transcribe/client/Socket.js";

export class Transcribe extends FernTranscribe {
    public async connect(args: Omit<FernTranscribe.ConnectArgs, 'token' | 'tenant-name'>): Promise<TranscribeSocket> {
        return super.connect({
            ...args,
            token: await this._getAuthorizationHeader(),
            "tenant-name": await core.Supplier.get(this._options.tenantName),
        });
    }
}
