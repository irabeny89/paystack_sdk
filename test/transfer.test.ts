import { beforeEach, describe, expect, test } from "bun:test";
import { Transfer } from "../src";

describe("Transfer", () => {
	const key = Bun.env.PAYSTACK_TEST_PRIVATE_KEY;
	const trfCode = "TRF_murmm2wv6cm4mowu";
	const trfRef = "whkbtwbryh";
	let trf: Transfer;

	beforeEach(() => {
		trf = new Transfer(key ?? "", { logLevel: "info" });
	});

	test("should list transfers", async () => {
		const res = await trf.list();
		expect(res.data).toBeArray();
	});

	test("should fetch transfer", async () => {
		const res = await trf.fetch(trfCode);
		expect(res.status).toBeTrue();
	});

	test("should verify transfer", async () => {
		const res = await trf.verify(trfRef);
		expect(res.status).toBeTrue();
	});
});
