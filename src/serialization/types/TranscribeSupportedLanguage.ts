/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index.js";
import * as Corti from "../../api/index.js";
import * as core from "../../core/index.js";

export const TranscribeSupportedLanguage: core.serialization.Schema<
    serializers.TranscribeSupportedLanguage.Raw,
    Corti.TranscribeSupportedLanguage
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

export declare namespace TranscribeSupportedLanguage {
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
