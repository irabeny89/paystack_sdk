import { beforeEach, describe, expect, test } from "bun:test";
import type { AxiosError } from "axios";
import {
	PAYSTACK_BASE_URL,
	TRANSFER_FINALIZE_PATH,
	TRANSFER_INITIATE_BULK_PATH,
	TRANSFER_PATH,
} from "../config";
import { Transfer } from "../src/features";
import type { OptionT } from "../src/types/global";
import type {
	FinalizeBodyParamsT,
	InitiateBodyParamsT,
	InitiateBulkBodyParamsT,
} from "../src/types/transfer_types";

describe("Paystack Transfer", () => {
	const SECRET = "paystack-secret-key";

	let transfer: Transfer;

	beforeEach(() => {
		transfer = new Transfer(SECRET);
	});

	test("should have an instance with no logger enabled", () => {
		expect(transfer.logLevel).toBeUndefined();
	});

	test("should have an instance with logger enabled", () => {
		const logLevel: OptionT["logLevel"] = "info";
		const transfer = new Transfer(SECRET, {
			logLevel,
		});

		expect(transfer.logLevel).toBe(logLevel);
	});

	test("should have Axios instance with Paystack base URL", () => {
		expect(transfer.axiosPaystackClient).toBeDefined();
		expect(transfer.axiosPaystackClient.getUri()).toBe(PAYSTACK_BASE_URL);
	});

	test("should send request to initiate transfer", async () => {
		const data: InitiateBodyParamsT = {
			amount: 1e3,
			recipient: "trans-rec",
			source: "balance",
		};

		try {
			await transfer.initiate(data);
		} catch (error) {
			const { response } = error as AxiosError;
			const authHeader = response?.config?.headers?.Authorization?.toString();

			expect(response?.statusText).toBe("Unauthorized");
			expect(authHeader?.includes(SECRET)).toBeTruthy();
			expect(response?.config.url).toBe(TRANSFER_PATH);
			expect(JSON.parse(response?.config.data)).toEqual(data);
		}
	});

	test("should send request to finalize transfer", async () => {
		const data: FinalizeBodyParamsT = {
			otp: "otp-123",
			transfer_code: "test code",
		};

		try {
			await transfer.finalize(data);
		} catch (error) {
			const { response } = error as AxiosError;
			const authHeader = response?.config?.headers?.Authorization?.toString();

			expect(response?.statusText).toBe("Unauthorized");
			expect(authHeader?.includes(SECRET)).toBeTruthy();
			expect(response?.config.url).toBe(TRANSFER_FINALIZE_PATH);
			expect(JSON.parse(response?.config.data)).toEqual(data);
		}
	});

	test("should send request to initiate bulk transfer", async () => {
		const data: InitiateBulkBodyParamsT = {
			source: "balance",
			transfers: [{ amount: 1e3, recipient: "rec" }],
		};

		try {
			await transfer.initiateBulk(data);
		} catch (error) {
			const { response } = error as AxiosError;
			const authHeader = response?.config?.headers?.Authorization?.toString();

			expect(response?.statusText).toBe("Unauthorized");
			expect(authHeader?.includes(SECRET)).toBeTruthy();
			expect(response?.config.url).toBe(TRANSFER_INITIATE_BULK_PATH);
			expect(JSON.parse(response?.config.data)).toEqual(data);
		}
	});

	test("should send request to list transfers", async () => {
		try {
			await transfer.list();
		} catch (error) {
			const { response } = error as AxiosError;
			const authHeader = response?.config?.headers?.Authorization?.toString();

			expect(response?.statusText).toBe("Unauthorized");
			expect(authHeader?.includes(SECRET)).toBeTruthy();
			expect(response?.config.url).toBe(TRANSFER_PATH);
		}
	});

	test("should send request to fetch a transfer with id or reference", async () => {
		const idOrCode = "12345";

		try {
			await transfer.fetch(idOrCode);
		} catch (error) {
			const { response } = error as AxiosError;
			const authHeader = response?.config?.headers?.Authorization?.toString();

			expect(response?.statusText).toBe("Unauthorized");
			expect(authHeader?.includes(SECRET)).toBeTruthy();
			expect(response?.config.url).toBe(`${TRANSFER_PATH}/${idOrCode}`);
		}
	});

	test("send request to verify transfer by reference", async () => {
		const reference = "12345";

		try {
			await transfer.verify(reference);
		} catch (error) {
			const { response } = error as AxiosError;
			const authHeader = response?.config?.headers?.Authorization?.toString();

			expect(response?.statusText).toBe("Unauthorized");
			expect(authHeader?.includes(SECRET)).toBeTruthy();
			expect(response?.config.url).toBe(`${TRANSFER_PATH}/verify/${reference}`);
		}
	});
});
