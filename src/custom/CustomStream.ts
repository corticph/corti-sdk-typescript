/**
 * Patch: use custom Stream implementation to support passing _options parameters to connection function
 */
import { Stream as FernStream } from "../api/resources/stream/client/Client.js";
import * as core from "../core/index.js";
/**
 * Patch: added import for types and message parsing logic
 */
import * as api from "../api/index.js";
import { fromJson } from "../core/json.js";
import * as serializers from "../serialization/index.js";

/**
 * Patch: changed import to custom StreamSocket implementation
 */
import { StreamSocket } from "./CustomStreamSocket.js";

export class Stream extends FernStream {
    /**
     * Patch: use custom connect method to support passing _options parameters
     */
    public async connect(
        args: Omit<FernStream.ConnectArgs, 'token' | 'tenantName'>,
        configuration?: api.StreamConfigurationMessage['configuration']
    ): Promise<StreamSocket> {
        const ws = await super.connect({
            ...args,
            token: await this._getAuthorizationHeader() || '',
            tenantName: await core.Supplier.get(this._options.tenantName),
        }) as StreamSocket;

        if (!configuration) {
            return ws;
        }

        return new Promise(async (resolve, reject) => {
            /**
             * Patch: reusing here parsing logic from the base class, because Socket can have only one event handler
             */
            function handleMessage(event: { data: string }) {
                const data = fromJson(event.data);

                const parsedResponse = serializers.StreamSocketResponse.parse(data, {
                    unrecognizedObjectKeys: "passthrough",
                    allowUnrecognizedUnionMembers: true,
                    allowUnrecognizedEnumValues: true,
                    skipValidation: true,
                    omitUndefined: true,
                });

                ws.socket.removeEventListener('message', handleMessage);

                if (parsedResponse.ok && parsedResponse.value.type === 'CONFIG_ACCEPTED') {
                    resolve(ws);
                    return;
                }

                reject(new Error('Configuration failed: ' + JSON.stringify(parsedResponse)));
            }

            ws.socket.addEventListener('message', handleMessage);

            await ws.waitForOpen();

            ws.sendConfiguration({
                type: 'config',
                configuration,
            });

            resolve(ws);
        });
    }
}
