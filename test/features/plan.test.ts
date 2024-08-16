import { beforeEach, describe, expect, test } from "bun:test";
import { Plan } from "../../src";
import type { PlanBodyParamsT } from "../../src/types/plan_types";

describe("Plan", () => {
	const key = Bun.env.PAYSTACK_TEST_PRIVATE_KEY ?? "";
	const planCode = "PLN_9jkrt7lf3gs65qb";
	const planBody: PlanBodyParamsT = {
		amount: 1e5,
		interval: "monthly",
		name: "Test Plan",
	};
	let plan: Plan;

	beforeEach(() => {
		plan = new Plan(key, { logLevel: "info" });
	});

	test("should create plan", async () => {
		const response = await plan.create(planBody);

		expect(response.status).toBeTrue();
	});

	test("should list plans", async () => {
		const response = await plan.list();

		expect(response.data).toBeArray();
	});

	test("should fetch plan", async () => {
		const response = await plan.fetch(planCode);

		expect(response.data.plan_code).toBe(planCode);
	});
});
