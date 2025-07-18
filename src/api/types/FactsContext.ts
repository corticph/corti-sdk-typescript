/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Corti from "../index.js";

export interface FactsContext {
    /** The text of the fact. */
    text: string;
    /** The group to which the fact belongs. */
    group?: string;
    /** The source of the fact. 'USER' refers to facts provided by the user, while 'SYSTEM' refers to system-generated facts (e.g., EHR). */
    source: Corti.CommonSourceEnum;
}
