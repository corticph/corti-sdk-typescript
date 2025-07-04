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
    public async connect(args: Omit<FernStream.ConnectArgs, 'token' | 'tenant-name'>): Promise<StreamSocket> {
        return this.__connect_patch({
            ...args,
            token: await this._getAuthorizationHeader(),
            "tenant-name": await core.Supplier.get(this._options.tenantName),
        });
    }

    /**
     * Patch: temporary fix of WS URL generation, while it doesn't work from Ferns side
     */
    private async __connect_patch(args: FernStream.ConnectArgs): Promise<StreamSocket> {
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
            `${(await core.Supplier.get(this._options["baseUrl"])) ?? (await core.Supplier.get(this._options["environment"])).wss}/audio-bridge/v2/interactions/${encodeURIComponent(args["id"])}/streams?${core.url.toQueryString(queryParams, { arrayFormat: "repeat" })}`,
            [],
            { debug: args["debug"] ?? false, maxRetries: args["reconnectAttempts"] ?? 30 },
            websocketHeaders,
        );
        return new StreamSocket({ socket });
    }
}
