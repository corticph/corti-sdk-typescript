import { CortiClient } from "../../../src";

describe("repro: CortiClient.recordings.upload with non-Latin-1 filename", () => {
    it("throws when uploading a mock file with an NFD-decomposed filename", async () => {
        const cortiClient = new CortiClient({
            environment: "https://example.test",
            tenantName: "test-tenant",
            auth: { accessToken: "test-token" },
        });

        // "e" + U+0301 (combining acute accent), the way macOS (HFS+/APFS) stores "café.mp3"
        const filename = "cafe\u0301.mp3";

        await expect(
            cortiClient.recordings.upload(
                { data: Buffer.from("mock recording bytes"), filename, contentType: "audio/mpeg" },
                "00000000-0000-0000-0000-000000000000",
            ),
        ).rejects.toThrow(/ISO-8859-1|ByteString/);
    });
});
