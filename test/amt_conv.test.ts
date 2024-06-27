import { describe, test, expect } from "bun:test"
import { convertToMainUnit, convertToSubUnit } from "../src/utils/amt_conv";

describe("convertToMainUnit", () => {
	test("should convert amount in sub unit to main unit", () => {
		expect(convertToMainUnit(100)).toBe(1);
	});
});

describe("convertToSubUnit", () => {
	test("should convert amount in main unit to sub unit", () => {
		expect(convertToSubUnit(1)).toBe(100);
	});
});
