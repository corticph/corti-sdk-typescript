/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Corti from "../../../../index.js";

/**
 * @example
 *     {
 *         facts: [{
 *                 text: "text",
 *                 group: "other"
 *             }]
 *     }
 */
export interface RequestFactsCreate {
    /** A list of facts to be created. */
    facts: Corti.RequestFactsCreateFactsItem[];
}
