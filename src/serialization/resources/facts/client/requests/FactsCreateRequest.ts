/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index.js";
import * as Corti from "../../../../../api/index.js";
import * as core from "../../../../../core/index.js";
import { FactsCreateInput } from "../../../../types/FactsCreateInput.js";

export const FactsCreateRequest: core.serialization.Schema<
    serializers.FactsCreateRequest.Raw,
    Corti.FactsCreateRequest
> = core.serialization.object({
    facts: core.serialization.list(FactsCreateInput),
});

export declare namespace FactsCreateRequest {
    export interface Raw {
        facts: FactsCreateInput.Raw[];
    }
}
