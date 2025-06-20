/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index.js";
import * as Corti from "../../api/index.js";
import * as core from "../../core/index.js";

export const EncounterType: core.serialization.Schema<serializers.EncounterType.Raw, Corti.EncounterType> =
    core.serialization.enum_(["first_consultation", "consultation", "emergency", "inpatient", "outpatient"]);

export declare namespace EncounterType {
    export type Raw = "first_consultation" | "consultation" | "emergency" | "inpatient" | "outpatient";
}
