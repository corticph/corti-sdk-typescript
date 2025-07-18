/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index.js";
import * as Corti from "../../api/index.js";
import * as core from "../../core/index.js";
import { TranscribeTranscriptData } from "./TranscribeTranscriptData.js";

export const TranscribeTranscriptMessage: core.serialization.ObjectSchema<
    serializers.TranscribeTranscriptMessage.Raw,
    Corti.TranscribeTranscriptMessage
> = core.serialization.object({
    type: core.serialization.stringLiteral("transcript"),
    data: TranscribeTranscriptData,
});

export declare namespace TranscribeTranscriptMessage {
    export interface Raw {
        type: "transcript";
        data: TranscribeTranscriptData.Raw;
    }
}
