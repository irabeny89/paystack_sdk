import { describe, expect, test } from "bun:test";
import { convertToMainUnit, convertToSubUnit } from "../../src";

describe("convertToMainUnit", () => {
	test("should convert amount in sub unit to main unit", () => {
		expect(convertToMainUnit(100)).toBe(1);
	});

	test("should error if amount has decimal values", () => {
		expect(() => convertToMainUnit(100.9)).toThrowError();
	});
});

describe("convertToSubUnit", () => {
	test("should convert amount in main unit to sub unit", () => {
		expect(convertToSubUnit(1)).toBe(100);
	});

	test("should error if amount has more than 2 decimal values", () => {
		expect(() => convertToSubUnit(100.555)).toThrowError();
	});
});
