import { faker } from "@faker-js/faker";
import type { CortiClient } from "../../src";
import { createTestCortiClient, setupConsoleWarnSpy } from "./testUtils";

describe("cortiClient.agentic.agents.update", () => {
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

    describe("should update maxLoops", () => {
        it("should update maxLoops to a new value without errors or warnings", async () => {
            expect.assertions(3);

            const created = await cortiClient.agentic.agents.create({
                name: faker.lorem.words(3),
                lifecycle: "persistent",
            });
            createdAgentIds.push(created.id);

            const result = await cortiClient.agentic.agents.update(created.id, { maxLoops: 50 });

            expect(result.maxLoops).toBe(50);
            expect(result).toBeDefined();
            expect(consoleWarnSpy).not.toHaveBeenCalled();
        });

        it("should leave maxLoops unchanged when omitted from the patch", async () => {
            expect.assertions(3);

            const created = await cortiClient.agentic.agents.create({
                name: faker.lorem.words(3),
                lifecycle: "persistent",
                maxLoops: 15,
            });
            createdAgentIds.push(created.id);

            const result = await cortiClient.agentic.agents.update(created.id, {
                description: faker.lorem.sentence(),
            });

            expect(result.maxLoops).toBe(15);
            expect(result).toBeDefined();
            expect(consoleWarnSpy).not.toHaveBeenCalled();
        });
    });

    // maxLoops is non-nullable in the patch body: unlike description/model/connectors/labels, null is rejected rather than resetting it.
    describe("should throw error when invalid parameters are provided", () => {
        it("should throw error when maxLoops is set to null", async () => {
            expect.assertions(1);

            const created = await cortiClient.agentic.agents.create({
                name: faker.lorem.words(3),
                lifecycle: "persistent",
            });
            createdAgentIds.push(created.id);

            await expect(
                // @ts-expect-error maxLoops is non-nullable in the patch body, unlike other patchable fields
                cortiClient.agentic.agents.update(created.id, { maxLoops: null }),
            ).rejects.toThrow();
        });

        it("should throw error when maxLoops exceeds maximum", async () => {
            expect.assertions(1);

            const created = await cortiClient.agentic.agents.create({
                name: faker.lorem.words(3),
                lifecycle: "persistent",
            });
            createdAgentIds.push(created.id);

            await expect(cortiClient.agentic.agents.update(created.id, { maxLoops: 101 })).rejects.toThrow();
        });
    });
});
