import { beforeEach, describe, expect, test } from "bun:test";
import type { AxiosError } from "axios";
import { Plan } from "../src/features/plans";
import { OptionT } from "../src/types/global";
import { PAYSTACK_BASE_URL, PLAN_PATH } from "../config";
import { PlanBodyParamsT } from "../src/types/plan_types";

describe("Paystack Plan", () => {
	const SECRET = "c-krit_secret";
	let plan: Plan;

	beforeEach(() => {
		plan = new Plan(SECRET);
	})

	test("should have an instance with no logger enabled", () => {
		expect(plan.logLevel).toBeUndefined();
	});

	test("should have an instance with logger enabled", () => {
		const logLevel: OptionT["logLevel"] = "info";
		const plan = new Plan(SECRET, {
			logLevel,
		});

		expect(plan.logLevel).toBe(logLevel);
	});

	test("should have Axios instance with Paystack base URL", () => {
		expect(plan.axiosPaystackClient).toBeDefined();
		expect(plan.axiosPaystackClient.getUri()).toBe(PAYSTACK_BASE_URL);
	});

	test("should send request to create a plan", async () => {
		const bodyParams: PlanBodyParamsT = {
			amount: 1e3, interval: "monthly", name: "Test Plan"
		}

		try {
			await plan.create(bodyParams);
		} catch (error) {
			const { response } = error as AxiosError;
			const authHeader = response?.config?.headers?.Authorization?.toString();

			expect(response?.statusText).toBe("Unauthorized");
			expect(authHeader?.includes(SECRET)).toBeTruthy();
			expect(response?.config.url).toBe(PLAN_PATH);
			expect(JSON.parse(response?.config.data)).toEqual(bodyParams);
		}
	})

	test("should send request to list plans", async () => {
		try {
			await plan.list();
		} catch (error) {
			const { response } = error as AxiosError;
			const authHeader = response?.config?.headers?.Authorization?.toString();

			expect(response?.statusText).toBe("Unauthorized");
			expect(authHeader?.includes(SECRET)).toBeTruthy();
			expect(response?.config.url).toBe(PLAN_PATH);
		}
	})

	test("should send request to fetch plan", async () => {
		const idOrCode = "123";
		try {
			await plan.fetch(idOrCode)
		} catch (error) {
			const { response } = error as AxiosError;
			const authHeader = response?.config?.headers?.Authorization?.toString();

			expect(response?.statusText).toBe("Unauthorized");
			expect(authHeader?.includes(SECRET)).toBeTruthy();
			expect(response?.config.url).toBe(`${PLAN_PATH}/${idOrCode}`);
		}
	})

	test("should send request to update plan", async () => {
		const idOrCode = "123asd";
		const bodyParams: PlanBodyParamsT = {
			amount: 1e3, interval: "monthly", name: "Test Plan"
		}

		try {
	await plan.update(idOrCode, bodyParams)
		} catch (error) {
			const { response } = error as AxiosError;
			const authHeader = response?.config?.headers?.Authorization?.toString();

			expect(response?.statusText).toBe("Unauthorized");
			expect(authHeader?.includes(SECRET)).toBeTruthy();
			expect(response?.config.url).toBe(`${PLAN_PATH}/${idOrCode}`);
			expect(JSON.parse(response?.config.data)).toEqual(bodyParams);
		}
	})
})