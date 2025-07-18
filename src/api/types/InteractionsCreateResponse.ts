/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Corti from "../index.js";

export interface InteractionsCreateResponse {
    /** Unique identifier for the interaction. */
    interactionId: Corti.Uuid;
    /** WebSocket URL for streaming real-time interactions. Append a token in the format: /interactions/{interactionID}/streams?token=Bearer token-value-here */
    websocketUrl: string;
}
