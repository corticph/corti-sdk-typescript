export const CortiEnvironment = {
    BetaEu: "beta-eu",
    Us: "us",
    Eu: "eu",
} as const;

export type CortiEnvironment = typeof CortiEnvironment.BetaEu | typeof CortiEnvironment.Us | typeof CortiEnvironment.Eu;
