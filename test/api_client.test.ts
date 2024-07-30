import { beforeEach, describe, expect, test } from "bun:test";
import { TRANSFER_PATH } from "../config";
import createApiClient from "../src/utils/api_client";

describe("API Client", () => {
	const SECRET = "asiri";
	let apiClient: undefined | ReturnType<typeof createApiClient>;

	beforeEach(() => {
		apiClient = createApiClient(SECRET);
	});

	test("should have api client", async () => {
		expect(apiClient).toBeDefined();
	});

	test("should have get method in api client", () => {
		expect(apiClient?.get).toBeDefined();
	});

	test("should throw not found error on invalid path", async () => {
		const errorMessage = "Not Found";
		try {
			await apiClient?.get("/invalid");
		} catch (error: unknown) {
			expect((error as Error).message).toBe(errorMessage);
		}
	});

	test("should throw unauthorized error on invalid secret", async () => {
		const errorMessage = "Unauthorized";
		try {
			await apiClient?.get(TRANSFER_PATH);
		} catch (error: unknown) {
			expect((error as Error).message).toBe(errorMessage);
		}
	});
});
