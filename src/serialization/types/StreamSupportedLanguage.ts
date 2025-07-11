/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index.js";
import * as Corti from "../../api/index.js";
import * as core from "../../core/index.js";

export const StreamSupportedLanguage: core.serialization.Schema<
    serializers.StreamSupportedLanguage.Raw,
    Corti.StreamSupportedLanguage
> = core.serialization.enum_([
    "en",
    "en-us",
    "en-gb",
    "da",
    "se",
    "no",
    "de",
    "nl",
    "es",
    "it",
    "fr",
    "pt",
    "de-ch",
    "sv",
]);

export declare namespace StreamSupportedLanguage {
    export type Raw =
        | "en"
        | "en-us"
        | "en-gb"
        | "da"
        | "se"
        | "no"
        | "de"
        | "nl"
        | "es"
        | "it"
        | "fr"
        | "pt"
        | "de-ch"
        | "sv";
}
