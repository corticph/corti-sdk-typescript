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
    public async connect(args: Omit<FernTranscribe.ConnectArgs, 'token' | 'tenant-name'> = {}): Promise<TranscribeSocket> {
        return this.__connect_patch({
            ...args,
            token: await this._getAuthorizationHeader(),
            "tenant-name": await core.Supplier.get(this._options.tenantName),
        });
    }

    /**
     * Patch: temporary fix of WS generation, while binary type isn't supported from Ferns side
     */
    private async __connect_patch(args: FernTranscribe.ConnectArgs): Promise<TranscribeSocket> {
        const queryParams: Record<string, unknown> = {};
        if (args["tenant-name"] != null) {
            queryParams["tenant-name"] = args["tenant-name"];
        }

        if (args["token"] != null) {
            queryParams["token"] = args["token"];
        }

        let websocketHeaders: Record<string, unknown> = {};
        websocketHeaders = {
            ...websocketHeaders,
            ...args["headers"],
        };
        const socket = new core.ReconnectingWebSocket(
            `${(await core.Supplier.get(this._options["baseUrl"])) ?? (await core.Supplier.get(this._options["environment"])).wss}/audio-bridge/v2/transcribe?${core.url.toQueryString(queryParams, { arrayFormat: "repeat" })}`,
            [],
            { debug: args["debug"] ?? false, maxRetries: args["reconnectAttempts"] ?? 30 },
            websocketHeaders,
        );
        return new TranscribeSocket({ socket });
    }
}
