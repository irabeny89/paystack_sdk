import { describe, expect, test } from "bun:test";
import type { AxiosError } from "axios";
import {
	PAYSTACK_BASE_URL,
	TRANSACTION_CHARGE_AUTHORIZATION_PATH,
	TRANSACTION_EXPORT_PATH,
	TRANSACTION_INITIALIZE_PATH,
	TRANSACTION_LIST_PATH,
	TRANSACTION_PARTIAL_DEBIT_PATH,
	TRANSACTION_TIMELINE_PATH,
	TRANSACTION_TOTALS_PATH,
	TRANSACTION_VERIFY_PATH,
} from "../config";
import { Transaction } from "../src/features/transaction";
import type { OptionT } from "../src/types/global";
import type {
	TransactionChargeAuthorizationBodyParamsT,
	TransactionPartialDebitBodyParamsT,
} from "../src/types/transaction_types";

describe("Paystack Transaction", () => {
	const SECRET = "secret";

	test("should have an instance with no logger enabled", () => {
		const transaction = new Transaction(SECRET);

		expect(transaction.logLevel).toBeUndefined();
	});

	test("should have an instance with logger enabled", () => {
		const logLevel: OptionT["logLevel"] = "info";
		const transaction = new Transaction(SECRET, {
			logLevel,
		});

		expect(transaction.logLevel).toBe(logLevel);
	});

	test("should have Axios instance with Paystack base URL", () => {
		const transaction = new Transaction(SECRET);

		expect(transaction.axiosPaystackClient).toBeDefined();
		expect(transaction.axiosPaystackClient.getUri()).toBe(PAYSTACK_BASE_URL);
	});

	test("should fail to initialize transaction with fake secret key", async () => {
		const transaction = new Transaction(SECRET);
		const payData = {
			email: "test@jest.com",
			amount: "10000",
		};

		try {
			await transaction.initialize(payData);
		} catch (error) {
			const { response } = error as AxiosError;
			const authHeader = response?.config?.headers?.Authorization?.toString();

			expect(response?.statusText).toBe("Unauthorized");
			expect(authHeader?.includes(SECRET)).toBeTruthy();
			expect(response?.config.url).toBe(TRANSACTION_INITIALIZE_PATH);
			expect(JSON.parse(response?.config.data)).toEqual(payData);
		}
	});

	test("should send request to verify transactions", async () => {
		const transaction = new Transaction(SECRET);
		const reference = "test-reference";

		try {
			await transaction.verify(reference);
		} catch (error) {
			const { response } = error as AxiosError;

			expect(response?.config.url).toBe(TRANSACTION_VERIFY_PATH + reference);
		}
	});

	test("should send request to get list of transactions without argument", async () => {
		const transaction = new Transaction(SECRET);

		try {
			await transaction.list();
		} catch (error) {
			const { response } = error as AxiosError;

			expect(response?.config.url).toBe(TRANSACTION_LIST_PATH);
		}
	});

	test("should send request to get list of transactions with arguments", async () => {
		const transaction = new Transaction(SECRET);
		const queryParams = { page: 1, perPage: 20 };

		try {
			await transaction.list(queryParams);
		} catch (error) {
			const { response } = error as AxiosError;

			expect(response?.config.url).toBe(TRANSACTION_LIST_PATH);
			expect(response?.config.params).toEqual(queryParams);
		}
	});

	test("should send request to get a transaction", async () => {
		const transactionId = "trx012";
		const transaction = new Transaction(SECRET);

		try {
			await transaction.fetch(transactionId);
		} catch (error) {
			const { response } = error as AxiosError;

			expect(response?.config.url).toBe(
				`${TRANSACTION_LIST_PATH}/${transactionId}`,
			);
		}
	});

	test("should send request to charge authorization", async () => {
		const transaction = new Transaction(SECRET);
		const requestBody: TransactionChargeAuthorizationBodyParamsT = {
			amount: (1e3).toString(),
			authorization_code: "123-charge-code",
			email: "test@fake.com",
		};

		try {
			await transaction.chargeAuthorization(requestBody);
		} catch (error) {
			const { response } = error as AxiosError;

			expect(response?.config.url).toBe(TRANSACTION_CHARGE_AUTHORIZATION_PATH);
			expect(JSON.parse(response?.config.data)).toEqual(requestBody);
		}
	});

	test("should send request to get transaction timelines with id or reference", async () => {
		const transaction = new Transaction(SECRET);
		const idOrRefence = "idorrefencevalue";

		try {
			await transaction.timeline(idOrRefence);
		} catch (error) {
			const { response } = error as AxiosError;

			expect(response?.config.url).toBe(
				TRANSACTION_TIMELINE_PATH + idOrRefence,
			);
		}
	});

	test("should send request to get total transactions with pagination", async () => {
		const transaction = new Transaction(SECRET);
		const axiosConfig = { params: { perPage: 20, page: 1 } };

		try {
			await transaction.totals(axiosConfig.params);
		} catch (error) {
			const { response } = error as AxiosError;

			expect(response?.config.url).toBe(TRANSACTION_TOTALS_PATH);
			expect(response?.config.params).toEqual(axiosConfig.params);
		}
	});

	test("should send request to export transactions", async () => {
		const transaction = new Transaction(SECRET);

		try {
			await transaction.export();
		} catch (error) {
			const { response } = error as AxiosError;

			expect(response?.config.url).toBe(TRANSACTION_EXPORT_PATH);
		}
	});

	test("should send request to get partial debit", async () => {
		const transaction = new Transaction(SECRET);
		const requestBody: TransactionPartialDebitBodyParamsT = {
			amount: (1e5).toString(),
			authorization_code: "AUTH_test101",
			currency: "NGN",
			email: "a@gmail.com",
		};

		try {
			await transaction.partialDebit(requestBody);
		} catch (error) {
			const { response } = error as AxiosError;

			expect(response?.config.url).toBe(TRANSACTION_PARTIAL_DEBIT_PATH);
			expect(JSON.parse(response?.config.data)).toEqual(requestBody);
		}
	});
});
