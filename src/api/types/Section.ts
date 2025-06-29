/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Corti from "../index.js";

export interface Section {
    /** The timestamp when the section was updated. */
    date_updated?: string;
    /** Name of the section */
    name?: string;
    /** Alternate names for the section */
    alternate_names?: string[];
    /** Unique key for the section */
    key?: string;
    /** Description of the section */
    description?: string;
    /** Default writing style for the section */
    default_writing_style?: Corti.WritingStyle;
    /** Type of section */
    section_type?: string;
    /** Available translations for the section */
    translations?: Corti.SectionTranslationsItem[];
}
