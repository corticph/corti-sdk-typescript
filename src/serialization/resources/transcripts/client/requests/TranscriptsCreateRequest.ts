/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index.js";
import * as Corti from "../../../../../api/index.js";
import * as core from "../../../../../core/index.js";
import { Uuid } from "../../../../types/Uuid.js";
import { TranscriptsParticipant } from "../../../../types/TranscriptsParticipant.js";
import { TranscriptsCreateRequestModelName } from "../../types/TranscriptsCreateRequestModelName.js";

export const TranscriptsCreateRequest: core.serialization.Schema<
    serializers.TranscriptsCreateRequest.Raw,
    Corti.TranscriptsCreateRequest
> = core.serialization.object({
    recordingId: Uuid,
    primaryLanguage: core.serialization.string(),
    isDictation: core.serialization.boolean().optional(),
    isMultichannel: core.serialization.boolean().optional(),
    diarize: core.serialization.boolean().optional(),
    participants: core.serialization.list(TranscriptsParticipant).optional(),
    modelName: TranscriptsCreateRequestModelName,
});

export declare namespace TranscriptsCreateRequest {
    export interface Raw {
        recordingId: Uuid.Raw;
        primaryLanguage: string;
        isDictation?: boolean | null;
        isMultichannel?: boolean | null;
        diarize?: boolean | null;
        participants?: TranscriptsParticipant.Raw[] | null;
        modelName: TranscriptsCreateRequestModelName.Raw;
    }
}
