import { beforeEach, describe, expect, test } from "bun:test";
import { Misc } from "../src";

describe("Miscellaneous", () => {
	const key = Bun.env.PAYSTACK_TEST_SECRET_KEY ?? "";
	let misc: Misc;

	beforeEach(() => {
		misc = new Misc(key, { logLevel: "debug" });
	});

	test("should list banks", async () => {
		const response = await misc.listBanks({
			country: "nigeria",
			currency: "NGN",
		});

		expect(response.data).toBeArray();
	});

	test("should list countries", async () => {
		const response = await misc.listCountries();

		expect(response.data).toBeArray();
	});

	test("should list states", async () => {
		const response = await misc.listStates("CA");

		expect(response.data).toBeArray();
	});
});
