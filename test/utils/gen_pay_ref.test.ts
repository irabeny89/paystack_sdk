import { describe, expect, test } from "bun:test";
import { generatePaymentReference } from "../../src";

describe("generatePaymentReference", () => {
	test("should generate a payment reference of 16 characters when no parameters are passed", () => {
		const paymentReference = generatePaymentReference();
		expect(paymentReference.length).toBe(16);
	});

	test("should generate a payment reference of 10 characters when length is 10", () => {
		const paymentReference = generatePaymentReference({ length: 10 });
		expect(paymentReference.length).toBe(10);
	});

	test("should generate a payment reference of 16 characters when length is 16", () => {
		const paymentReference = generatePaymentReference({ length: 16 });
		expect(paymentReference.length).toBe(16);
	});

	test("should generate a payment reference with a prefix when preTag is passed", () => {
		const paymentReference = generatePaymentReference({ preTag: "TEST" });
		expect(paymentReference.startsWith("TEST-")).toBe(true);
	});

	test("should generate a payment reference with a prefix and characters not more than length", () => {
		const paymentReference = generatePaymentReference({
			preTag: "TEST",
			length: 10,
		});
		expect(paymentReference.startsWith("TEST-")).toBe(true);
		expect(paymentReference.length).toBe(10);
	});

	test("should generate a payment reference and remove invalid characters", () => {
		const paymentReference = generatePaymentReference({
			preTag: "TEST__+&",
		});
		expect(paymentReference.startsWith("TEST-")).toBe(true);
		expect(paymentReference).toMatch(/^[a-zA-Z0-9\-\.\,\=]+$/);
	});
});
