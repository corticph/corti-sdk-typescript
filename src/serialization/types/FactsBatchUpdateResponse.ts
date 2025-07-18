/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index.js";
import * as Corti from "../../api/index.js";
import * as core from "../../core/index.js";
import { FactsBatchUpdateItem } from "./FactsBatchUpdateItem.js";

export const FactsBatchUpdateResponse: core.serialization.ObjectSchema<
    serializers.FactsBatchUpdateResponse.Raw,
    Corti.FactsBatchUpdateResponse
> = core.serialization.object({
    facts: core.serialization.list(FactsBatchUpdateItem),
});

export declare namespace FactsBatchUpdateResponse {
    export interface Raw {
        facts: FactsBatchUpdateItem.Raw[];
    }
}
