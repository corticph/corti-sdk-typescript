import { faker } from "@faker-js/faker";
import type { CortiClient } from "../../src";
import { createTestCortiClient, setupConsoleWarnSpy } from "./testUtils";

describe("cortiClient.agentic.agents.create", () => {
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

    describe("should create agent with only required values", () => {
        it("should default maxLoops to 10 and expiresAt to null when omitted", async () => {
            expect.assertions(4);

            const result = await cortiClient.agentic.agents.create({
                name: faker.lorem.words(3),
                lifecycle: "persistent",
            });
            createdAgentIds.push(result.id);

            expect(result.maxLoops).toBe(10);
            expect(result.expiresAt).toBeNull();
            expect(result).toBeDefined();
            expect(consoleWarnSpy).not.toHaveBeenCalled();
        });
    });

    describe("should create agent with maxLoops", () => {
        it("should create agent with explicit maxLoops without errors or warnings", async () => {
            expect.assertions(3);

            const result = await cortiClient.agentic.agents.create({
                name: faker.lorem.words(3),
                lifecycle: "persistent",
                maxLoops: 25,
            });
            createdAgentIds.push(result.id);

            expect(result.maxLoops).toBe(25);
            expect(result).toBeDefined();
            expect(consoleWarnSpy).not.toHaveBeenCalled();
        });

        it("should set expiresAt for ephemeral agents", async () => {
            expect.assertions(3);

            const result = await cortiClient.agentic.agents.create({
                name: faker.lorem.words(3),
                lifecycle: "ephemeral",
            });
            createdAgentIds.push(result.id);

            expect(result.expiresAt).not.toBeNull();
            expect(result).toBeDefined();
            expect(consoleWarnSpy).not.toHaveBeenCalled();
        });
    });

    describe("should throw error when invalid parameters are provided", () => {
        it("should throw error when maxLoops is below minimum", async () => {
            expect.assertions(1);

            await expect(
                cortiClient.agentic.agents.create({
                    name: faker.lorem.words(3),
                    maxLoops: 0,
                }),
            ).rejects.toThrow();
        });

        it("should throw error when maxLoops exceeds maximum", async () => {
            expect.assertions(1);

            await expect(
                cortiClient.agentic.agents.create({
                    name: faker.lorem.words(3),
                    maxLoops: 101,
                }),
            ).rejects.toThrow();
        });
    });
});
