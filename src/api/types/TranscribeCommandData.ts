/**
 * This file was auto-generated by Fern from our API Definition.
 */

export interface TranscribeCommandData {
    /** To identify the command when it gets detected and returned over the WebSocket */
    id: string;
    /** The variables identified */
    variables?: Record<string, (string | null) | undefined> | null;
    /** The raw transcript without spoken punctuation applied and without command phrases removed */
    rawTranscriptText: string;
    /** Start time of the transcript segment in seconds */
    start: number;
    /** End time of the transcript segment in seconds */
    end: number;
}
