/**
 * This file was auto-generated by Fern from our API Definition.
 */

export interface GetTokenResponse {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    refreshToken?: string;
    refreshExpiresIn?: number;
}
