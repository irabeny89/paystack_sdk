import { beforeEach, describe, expect, test } from "bun:test";
import { Transaction } from "../../src";

describe("Transaction", () => {
	const key = Bun.env.PAYSTACK_TEST_PRIVATE_KEY ?? "";
	let trx: Transaction;

	beforeEach(() => {
		trx = new Transaction(key, { logLevel: "info" });
	});

	test("should initialize transaction", async () => {
		const res = await trx.initialize({
			email: "customer@email.com",
			amount: "20000",
		});
		expect(res.status).toBeTrue();
	});

	test("should list transactions", async () => {
		const res = await trx.list();
		expect(res.status).toBeTrue();
	});

	test("should show total amount", async () => {
		const res = await trx.totals();
		expect(res.status).toBeTrue();
	});

	test("should export transaction", async () => {
		const res = await trx.export();
		expect(res.status).toBeTrue();
	});
});
