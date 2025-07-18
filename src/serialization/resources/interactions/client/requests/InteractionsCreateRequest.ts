/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index.js";
import * as Corti from "../../../../../api/index.js";
import * as core from "../../../../../core/index.js";
import { Uuid } from "../../../../types/Uuid.js";
import { InteractionsEncounterCreateRequest } from "../../../../types/InteractionsEncounterCreateRequest.js";
import { InteractionsPatient } from "../../../../types/InteractionsPatient.js";

export const InteractionsCreateRequest: core.serialization.Schema<
    serializers.InteractionsCreateRequest.Raw,
    Corti.InteractionsCreateRequest
> = core.serialization.object({
    assignedUserId: Uuid.optional(),
    encounter: InteractionsEncounterCreateRequest,
    patient: InteractionsPatient.optional(),
});

export declare namespace InteractionsCreateRequest {
    export interface Raw {
        assignedUserId?: Uuid.Raw | null;
        encounter: InteractionsEncounterCreateRequest.Raw;
        patient?: InteractionsPatient.Raw | null;
    }
}
