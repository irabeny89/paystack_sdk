import { beforeEach, describe, expect, test } from "bun:test";
import { PAYSTACK_BASE_URL } from "../config";
import Paystack from "../src";
import type { OptionT } from "../src/types/global";

describe("Paystack", () => {
	const SECRET = "secret";

	let paystack: Paystack;

	beforeEach(() => {
		paystack = new Paystack(SECRET);
	});

	test("should have an instance with no logger enabled", () => {
		expect(paystack.logLevel).toBeUndefined();
	});

	test("should have an instance with logger enabled", () => {
		const logLevel: OptionT["logLevel"] = "info";
		const transferRecipient = new Paystack(SECRET, {
			logLevel,
		});

		expect(transferRecipient.logLevel).toBe(logLevel);
	});

	test("should have Axios instance with Paystack base URL", () => {
		expect(paystack.axiosPaystackClient).toBeDefined();
		expect(paystack.axiosPaystackClient.getUri()).toBe(PAYSTACK_BASE_URL);
	});

	test("should have Paystack transaction object property defined", () => {
		expect(paystack.transaction).toBeDefined();
	});

	test("should have Paystack transfer recipient object property defined", () => {
		expect(paystack.transferRecipient).toBeDefined();
	});

	test("should have Paystack transfer object property defined", () => {
		expect(paystack.transfer).toBeDefined();
	});
});
