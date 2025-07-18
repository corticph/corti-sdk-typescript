/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index.js";
import * as Corti from "../../api/index.js";
import * as core from "../../core/index.js";
import { StreamFact } from "./StreamFact.js";

export const StreamFactsMessage: core.serialization.ObjectSchema<
    serializers.StreamFactsMessage.Raw,
    Corti.StreamFactsMessage
> = core.serialization.object({
    type: core.serialization.stringLiteral("facts"),
    fact: core.serialization.list(StreamFact),
});

export declare namespace StreamFactsMessage {
    export interface Raw {
        type: "facts";
        fact: StreamFact.Raw[];
    }
}
