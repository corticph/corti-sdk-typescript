/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index.js";
import * as Corti from "../../api/index.js";
import * as core from "../../core/index.js";
import { StreamParticipant } from "./StreamParticipant.js";
import { StreamTranscriptTime } from "./StreamTranscriptTime.js";

export const StreamTranscript: core.serialization.ObjectSchema<
    serializers.StreamTranscript.Raw,
    Corti.StreamTranscript
> = core.serialization.object({
    id: core.serialization.string(),
    transcript: core.serialization.string(),
    final: core.serialization.boolean(),
    speakerId: core.serialization.number(),
    participant: StreamParticipant,
    time: StreamTranscriptTime,
});

export declare namespace StreamTranscript {
    export interface Raw {
        id: string;
        transcript: string;
        final: boolean;
        speakerId: number;
        participant: StreamParticipant.Raw;
        time: StreamTranscriptTime.Raw;
    }
}
