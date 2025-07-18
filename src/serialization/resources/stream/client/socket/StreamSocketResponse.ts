/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index.js";
import * as Corti from "../../../../../api/index.js";
import * as core from "../../../../../core/index.js";
import { StreamConfigStatusMessage } from "../../../../types/StreamConfigStatusMessage.js";
import { StreamTranscriptMessage } from "../../../../types/StreamTranscriptMessage.js";
import { StreamFactsMessage } from "../../../../types/StreamFactsMessage.js";
import { StreamEndedMessage } from "../../../../types/StreamEndedMessage.js";
import { StreamUsageMessage } from "../../../../types/StreamUsageMessage.js";
import { StreamErrorMessage } from "../../../../types/StreamErrorMessage.js";

export const StreamSocketResponse: core.serialization.Schema<
    serializers.StreamSocketResponse.Raw,
    | Corti.StreamConfigStatusMessage
    | Corti.StreamTranscriptMessage
    | Corti.StreamFactsMessage
    | Corti.StreamEndedMessage
    | Corti.StreamUsageMessage
    | Corti.StreamErrorMessage
> = core.serialization.undiscriminatedUnion([
    StreamConfigStatusMessage,
    StreamTranscriptMessage,
    StreamFactsMessage,
    StreamEndedMessage,
    StreamUsageMessage,
    StreamErrorMessage,
]);

export declare namespace StreamSocketResponse {
    export type Raw =
        | StreamConfigStatusMessage.Raw
        | StreamTranscriptMessage.Raw
        | StreamFactsMessage.Raw
        | StreamEndedMessage.Raw
        | StreamUsageMessage.Raw
        | StreamErrorMessage.Raw;
}
