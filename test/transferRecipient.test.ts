import { beforeEach, describe, expect, test } from "bun:test";
import type { AxiosError } from "axios";
import {
	PAYSTACK_BASE_URL,
	TRANSFER_RECIPIENT_BULK_CREATE_PATH,
	TRANSFER_RECIPIENT_PATH,
} from "../config";
import { TransferRecipient } from "../src";
import type { OptionT } from "../src/types/global";
import type {
	TransferRecipientBulkCreateBodyParamsT,
	TransferRecipientMobileMoneyBodyParamsT,
	TransferRecipientNubanOrBasaBodyParamsT,
} from "../src/types/transfer_recipient_types";

describe("Paystack Transfer Recipient", () => {
	const SECRET = "secret";

	let transferRecipient: TransferRecipient;

	beforeEach(() => {
		transferRecipient = new TransferRecipient(SECRET);
	});

	test("should have an instance with no logger enabled", () => {
		expect(transferRecipient.logLevel).toBeUndefined();
	});

	test("should have an instance with logger enabled", () => {
		const logLevel: OptionT["logLevel"] = "info";
		const transferRecipient = new TransferRecipient(SECRET, {
			logLevel,
		});

		expect(transferRecipient.logLevel).toBe(logLevel);
	});

	test("should have Axios instance with Paystack base URL", () => {
		expect(transferRecipient.axiosPaystackClient).toBeDefined();
		expect(transferRecipient.axiosPaystackClient.getUri()).toBe(
			PAYSTACK_BASE_URL,
		);
	});

	test("should send request to create transfer recipient", async () => {
		const requestBody: TransferRecipientNubanOrBasaBodyParamsT = {
			account_number: "12345",
			bank_code: "123abc",
			currency: "NGN",
			type: "nuban",
		};

		try {
			await transferRecipient.create(requestBody);
		} catch (error) {
			const { response } = error as AxiosError;
			const authHeader = response?.config?.headers?.Authorization?.toString();

			expect(response?.statusText).toBe("Unauthorized");
			expect(authHeader?.includes(SECRET)).toBeTruthy();
			expect(response?.config.url).toBe(TRANSFER_RECIPIENT_PATH);
			expect(JSON.parse(response?.config.data)).toEqual(requestBody);
		}
	});

	test("should send request to create bulk transfer recipients", async () => {
		const nubanRecipient: TransferRecipientNubanOrBasaBodyParamsT = {
			account_number: "12345",
			bank_code: "123abc",
			currency: "NGN",
			type: "nuban",
		};
		const mobileMoneyRecipient: TransferRecipientMobileMoneyBodyParamsT = {
			currency: "NGN",
			type: "mobile_money",
		};

		const requestBody: TransferRecipientBulkCreateBodyParamsT = {
			batch: [nubanRecipient, mobileMoneyRecipient],
		};

		try {
			await transferRecipient.bulkCreate(requestBody);
		} catch (error) {
			const { response } = error as AxiosError;
			const authHeader = response?.config?.headers?.Authorization?.toString();

			expect(response?.statusText).toBe("Unauthorized");
			expect(authHeader?.includes(SECRET)).toBeTruthy();
			expect(response?.config.url).toBe(TRANSFER_RECIPIENT_BULK_CREATE_PATH);
			expect(JSON.parse(response?.config.data)).toEqual(requestBody);
		}
	});

	test("should send request to get list of transfer recipients", async () => {
		try {
			await transferRecipient.list();
		} catch (error) {
			const { response } = error as AxiosError;
			const authHeader = response?.config?.headers?.Authorization?.toString();

			expect(response?.statusText).toBe("Unauthorized");
			expect(authHeader?.includes(SECRET)).toBeTruthy();
			expect(response?.config.url).toBe(TRANSFER_RECIPIENT_PATH);
		}
	});

	test("should send a request to get a transfer recipient", async () => {
		const idOrCode = "i90rC093";

		try {
			await transferRecipient.fetch(idOrCode);
		} catch (error) {
			const { response } = error as AxiosError;
			const authHeader = response?.config?.headers?.Authorization?.toString();

			expect(response?.statusText).toBe("Unauthorized");
			expect(authHeader?.includes(SECRET)).toBeTruthy();
			expect(response?.config.url).toBe(
				`${TRANSFER_RECIPIENT_PATH}/${idOrCode}`,
			);
		}
	});

	test("should send request to update a transfer recipient", async () => {
		const idOrCode = "i90rC093";
		const update = { name: "tester", email: "tester@jest.com" };

		try {
			await transferRecipient.update(idOrCode, update);
		} catch (error) {
			const { response } = error as AxiosError;
			const authHeader = response?.config?.headers?.Authorization?.toString();

			expect(response?.statusText).toBe("Unauthorized");
			expect(authHeader?.includes(SECRET)).toBeTruthy();
			expect(response?.config.url).toBe(
				`${TRANSFER_RECIPIENT_PATH}/${idOrCode}`,
			);
			expect(JSON.parse(response?.config.data)).toEqual(update);
		}
	});

	test("should send a request to delete a transfer recipient", async () => {
		const idOrCode = "i90rC093";

		try {
			await transferRecipient.delete(idOrCode);
		} catch (error) {
			const { response } = error as AxiosError;
			const authHeader = response?.config?.headers?.Authorization?.toString();

			expect(response?.statusText).toBe("Unauthorized");
			expect(authHeader?.includes(SECRET)).toBeTruthy();
			expect(response?.config.url).toBe(
				`${TRANSFER_RECIPIENT_PATH}/${idOrCode}`,
			);
		}
	});
});
