/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index.js";
import * as Corti from "../../api/index.js";
import * as core from "../../core/index.js";
import { StreamErrorDetail } from "./StreamErrorDetail.js";

export const StreamErrorMessage: core.serialization.ObjectSchema<
    serializers.StreamErrorMessage.Raw,
    Corti.StreamErrorMessage
> = core.serialization.object({
    type: core.serialization.stringLiteral("error"),
    error: StreamErrorDetail,
});

export declare namespace StreamErrorMessage {
    export interface Raw {
        type: "error";
        error: StreamErrorDetail.Raw;
    }
}
