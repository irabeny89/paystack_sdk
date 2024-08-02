import { beforeEach, describe, expect, test } from "bun:test";
import { PAYSTACK_BASE_URL, TRANSFER_PATH } from "../config";
import createApiClient, {
	addParamsToUrl,
	createUrl,
} from "../src/utils/api_client";

describe("API Client", () => {
	const SECRET = "asiri";
	let apiClient: undefined | ReturnType<typeof createApiClient>;

	beforeEach(() => {
		apiClient = createApiClient(SECRET);
	});

	test("should add param with `?` to url", () => {
		const url = PAYSTACK_BASE_URL;
		const key = "a";
		const value = 0;

		const newUrl = addParamsToUrl(url, [key, value], 0);

		expect(newUrl).toBe(`${url}?${key}=${value}`);
	});

	test("should add param with `&` to url", () => {
		const url = PAYSTACK_BASE_URL;
		const key = "a";
		const value = 0;

		const newUrl = addParamsToUrl(url, [key, value], 1);

		expect(newUrl).toBe(`${url}&${key}=${value}`);
	});

	test("should add path to base url", () => {
		const path = "/test";

		expect(createUrl(path)).toBe(`${PAYSTACK_BASE_URL}${path}`);
	});

	test("should add path, path and query params to base url", () => {
		const path = "/test";
		const query = { a: 1 };
		const url = `${PAYSTACK_BASE_URL}${path}?${Object.keys(query)[0]}=${query.a}`;

		expect(createUrl(path, query)).toBe(url);
	});

	test("should throw not found error for get method on invalid path", async () => {
		const errorMessage = "404: Not Found";
		try {
			await apiClient?.get("/invalid");
		} catch (error: unknown) {
			expect((error as Error).message).toBe(errorMessage);
		}
	});

	test("should throw unauthorized error for get method on invalid secret", async () => {
		const errorMessage = "401: Unauthorized";
		try {
			await apiClient?.get(TRANSFER_PATH);
		} catch (error: unknown) {
			expect((error as Error).message).toBe(errorMessage);
		}
	});

	test("should throw not found error for post method on invalid path", async () => {
		const errorMessage = "404: Not Found";
		try {
			await apiClient?.post("/invalid", {});
		} catch (error: unknown) {
			expect((error as Error).message).toBe(errorMessage);
		}
	});

	test("should throw unauthorized error for post method on invalid secret", async () => {
		const errorMessage = "401: Unauthorized";
		try {
			await apiClient?.post(TRANSFER_PATH, {});
		} catch (error: unknown) {
			expect((error as Error).message).toBe(errorMessage);
		}
	});
});
