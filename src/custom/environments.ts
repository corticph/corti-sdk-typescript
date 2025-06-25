/**
 * Replacing original environment (src/environments.ts) constants with custom ones.
 * Original constants were full URLs, now it is just "environment" variable, and baseUrl-s are being generated under the hood.
 */
export const CortiEnvironment = {
    BetaEu: "beta-eu",
    Us: "us",
    Eu: "eu",
} as const;

export type CortiEnvironment = typeof CortiEnvironment.BetaEu | typeof CortiEnvironment.Us | typeof CortiEnvironment.Eu;
export type CortiEnvironmentUrls = CortiEnvironment;
