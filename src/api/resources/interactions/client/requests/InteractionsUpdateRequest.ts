/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Corti from "../../../../index.js";

/**
 * @example
 *     {}
 */
export interface InteractionsUpdateRequest {
    /** The unique identifier of the medical professional responsible for this interaction.  If nulled, automatically set to a uuid. */
    assignedUserId?: Corti.Uuid;
    /** Details of the encounter being updated. */
    encounter?: Corti.InteractionsEncounterUpdateRequest;
    /** Patient-related updates. */
    patient?: Corti.InteractionsPatient;
}
