/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Corti from "../index.js";

export interface ResponseTranscriptListAllTranscriptsItem {
    /** The unique identifier of the transcript. */
    id?: Corti.Uuid;
    transcriptSample?: string;
    transcript?: Corti.ResponseTranscriptListFull;
}
