/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index.js";
import * as Corti from "../../api/index.js";
import * as core from "../../core/index.js";
import { TranscribeConfig } from "./TranscribeConfig.js";

export const TranscribeConfigMessage: core.serialization.ObjectSchema<
    serializers.TranscribeConfigMessage.Raw,
    Corti.TranscribeConfigMessage
> = core.serialization.object({
    type: core.serialization.stringLiteral("config"),
    configuration: TranscribeConfig,
});

export declare namespace TranscribeConfigMessage {
    export interface Raw {
        type: "config";
        configuration: TranscribeConfig.Raw;
    }
}
