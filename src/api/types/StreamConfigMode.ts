/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Corti from "../index.js";

export interface StreamConfigMode {
    /** Processing mode */
    type: Corti.StreamConfigModeType;
    /** Output language locale specific to facts. */
    outputLocale?: Corti.StreamSupportedLanguage;
    /** Template identifier for processing configuration */
    templateId?: string;
}
