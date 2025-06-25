/**
 * Patch: use custom Stream implementation to support passing _options parameters to connection function
 */
import { Stream as FernStream } from "../api/resources/stream/client/Client.js";
import { Supplier } from "../core/index.js";
import { StreamSocket } from "../api/resources/stream/client/Socket";
import * as core from "../core";
import * as environments from "../environments";
import * as qs from "qs";

export class Stream extends FernStream {
    public async connect(args: Omit<FernStream.ConnectArgs, 'token' | 'tenantName'>) {
        return this.__connect_patch({
            ...args,
            token: await this._getAuthorizationHeader(),
            tenantName: await Supplier.get(this._options.tenantName),
        });
    }

    /**
     * Patch: temporary fix of WS URL generation, while it doesn't work from Ferns side
     */
    public async __connect_patch(args: FernStream.ConnectArgs): Promise<StreamSocket> {
        const queryParams: Record<string, unknown> = {};
        if (args["token"] != null) {
            queryParams["token"] = args["token"];
        }

        if (args["tenantName"] != null) {
            queryParams["tenantName"] = args["tenantName"];
        }

        let websocketHeaders: Record<string, unknown> = {};
        websocketHeaders = {
            ...websocketHeaders,
            ...args["headers"],
        };
        const socket = new core.ReconnectingWebSocket(
            `${(await core.Supplier.get(this._options["baseUrl"])) ?? ((await core.Supplier.get(this._options["environment"])) ?? environments.CortiEnvironment.BetaEu).wss}/audio-bridge/v2/interactions/${encodeURIComponent(args["id"])}/streams?${qs.stringify(queryParams, { arrayFormat: "repeat" })}`,
            [],
            { debug: args["debug"] ?? false, maxRetries: args["reconnectAttempts"] ?? 30 },
            websocketHeaders,
        );
        return new StreamSocket({ socket });
    }
}
