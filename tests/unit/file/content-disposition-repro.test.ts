import { toBinaryUploadRequest, type Uploadable } from "../../../src/core/file/index";

describe("repro: Content-Disposition header with non-Latin-1 filename", () => {
    it("throws when constructing headers for a mock file with an NFD-decomposed filename", async () => {
        // "e" + U+0301 (combining acute accent), the way macOS (HFS+/APFS) stores "café.txt"
        const filename = "cafe\u0301.txt";

        const mockFile: Uploadable.WithMetadata = {
            data: Buffer.from("mock file contents"),
            filename,
            contentType: "text/plain",
        };

        const request = await toBinaryUploadRequest(mockFile);

        expect(() => {
            const headers = new Headers();
            for (const [key, value] of Object.entries(request.headers ?? {})) {
                headers.set(key, value);
            }
        }).toThrow(/ISO-8859-1|ByteString/);
    });
});
