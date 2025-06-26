/**
 * Patch: file patches disability of auto-generating binary data methods for sending data to the socket
 */
import { StreamSocket as FernStreamSocket } from '../api/resources/stream/client/Socket.js';
import * as core from "../core";

export class StreamSocket extends FernStreamSocket {
    public sendAudio(message: ArrayBuffer | string): void {
        if (typeof message === 'string') {
            return super.sendAudio(message);
        }

        this.__assertSocketIsOpen();
        this.socket.send(message);
    }

    /**
     * Patch: have to repeat this method, because it is private in the base class
     */
    private __assertSocketIsOpen(): void {
        if (!this.socket) {
            throw new Error("Socket is not connected.");
        }

        if (this.socket.readyState !== core.ReconnectingWebSocket.OPEN) {
            throw new Error("Socket is not open.");
        }
    }
}
