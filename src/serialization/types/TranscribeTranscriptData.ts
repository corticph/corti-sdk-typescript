/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index.js";
import * as Corti from "../../api/index.js";
import * as core from "../../core/index.js";

export const TranscribeTranscriptData: core.serialization.ObjectSchema<
    serializers.TranscribeTranscriptData.Raw,
    Corti.TranscribeTranscriptData
> = core.serialization.object({
    text: core.serialization.string(),
    rawTranscriptText: core.serialization.string(),
    start: core.serialization.number(),
    end: core.serialization.number(),
    isFinal: core.serialization.boolean(),
});

export declare namespace TranscribeTranscriptData {
    export interface Raw {
        text: string;
        rawTranscriptText: string;
        start: number;
        end: number;
        isFinal: boolean;
    }
}
