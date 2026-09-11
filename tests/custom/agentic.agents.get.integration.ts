import { faker } from "@faker-js/faker";
import type { CortiClient } from "../../src";
import { createTestCortiClient, setupConsoleWarnSpy } from "./testUtils";

describe("cortiClient.agentic.agents.get", () => {
    let cortiClient: CortiClient;
    let consoleWarnSpy: ReturnType<typeof setupConsoleWarnSpy>;
    let createdAgentIds: string[];

    beforeAll(() => {
        cortiClient = createTestCortiClient();
    });

    beforeEach(() => {
        consoleWarnSpy = setupConsoleWarnSpy();
        createdAgentIds = [];
    });

    afterEach(async () => {
        consoleWarnSpy.mockRestore();
        await Promise.allSettled(createdAgentIds.map((id) => cortiClient.agentic.agents.delete(id)));
    });

    describe("response shape for maxLoops and expiresAt", () => {
        it("should return maxLoops and expiresAt for a persistent agent without errors or warnings", async () => {
            expect.assertions(4);

            const created = await cortiClient.agentic.agents.create({
                name: faker.lorem.words(3),
                lifecycle: "persistent",
                maxLoops: 42,
            });
            createdAgentIds.push(created.id);

            const result = await cortiClient.agentic.agents.get(created.id);

            expect(result.maxLoops).toBe(42);
            expect(result.expiresAt ?? null).toBeNull();
            expect(result).toBeDefined();
            expect(consoleWarnSpy).not.toHaveBeenCalled();
        });
    });

    describe("should throw error when invalid parameters are provided", () => {
        it("should throw error when agentId does not exist", async () => {
            expect.assertions(1);

            await expect(cortiClient.agentic.agents.get("agt.00000000-0000-7000-8000-000000000000")).rejects.toThrow();
        });
    });
});
