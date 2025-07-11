/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index.js";
import * as Corti from "../../api/index.js";
import * as core from "../../core/index.js";
import { Uuid } from "./Uuid.js";

export const RecordingsListResponse: core.serialization.ObjectSchema<
    serializers.RecordingsListResponse.Raw,
    Corti.RecordingsListResponse
> = core.serialization.object({
    recordings: core.serialization.list(Uuid),
});

export declare namespace RecordingsListResponse {
    export interface Raw {
        recordings: Uuid.Raw[];
    }
}
