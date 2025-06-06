import type {
	/** Options for currency. */
	CurrencyOptionT,
	/** Options for domain. */
	DomainOptionT,
	/** Common ID and timestamps. */
	IdAndTimestampsT,
	/** Options for interval. */
	IntervalOptionT,
	/** Query parameters for list endpoints. */
	ListQueryParamsT,
} from "./global";
import type { SubscriptionT } from "./subscription_types";

/**
 * Parameters for creating a new plan.
 */
export type PlanBodyParamsT = {
	/** Name of the plan. */
	name: string;
	/** Amount in the subunit of the supported currency. */
	amount: number;
	/** Interval of the plan. Valid intervals are: daily, weekly, monthly, quarterly, biannually (every 6 months), annually. */
	interval: IntervalOptionT;
	/** Description of the plan. */
	description?: string;
	/** Whether to send invoices to customers. */
	send_invoices?: boolean;
	/** Whether to send SMS messages to customers. */
	send_sms?: string;
	/** Currency of the amount. */
	currency?: CurrencyOptionT;
	/** Number of invoices to raise during the subscription. Can be overridden when subscribing. */
	invoice_limit?: number;
};

/**
 * Data representing a plan.
 */
export type PlanDataT = {
	/** Name of the plan. */
	name: string;
	/** Amount in the subunit of the supported currency. */
	amount: number;
	/** Description of the plan. */
	description?: string | null;
	/** Interval of the plan. */
	interval: IntervalOptionT;
	/** ID of the integration. */
	integration: number;
	/** Domain of the plan. */
	domain: DomainOptionT;
	/** Plan code. */
	plan_code: string;
	/** Whether to send invoices to customers. */
	send_invoices: boolean;
	/** Whether to send SMS messages to customers. */
	send_sms: boolean;
	/** Whether the plan has a hosted page. */
	hosted_page: boolean;
	/** URL of the hosted page. */
	hosted_page_url: string | null;
	/** Summary of the hosted page. */
	hosted_page_summary: string | null;
	/** Migration status. */
	migrate: string | null;
	/** Currency of the amount. */
	currency: CurrencyOptionT;
} & IdAndTimestampsT;

/**
 * Query parameters for listing plans.
 */
export type PlanListQueryParamsT = {
	/** Filter plans by status. */
	status: string;
	/** Filter plans by interval. */
	interval: string;
	/** Filter plans by amount. */
	amount: number;
} & Pick<ListQueryParamsT, "page" | "perPage">;

/**
 * Data returned when retrieving plan information.
 */
export type PlanResponseDataT = {
	/** Subscriptions associated with the plan. */
	subscriptions: SubscriptionT[];
	/** ID of the integration. */
	integration: number;
	/** Domain of the plan. */
	domain: DomainOptionT;
	/** Name of the plan. */
	name: string;
	/** Plan code. */
	plan_code: string;
	/** Description of the plan. */
	description?: string | null;
	/** Amount in the subunit of the supported currency. */
	amount: number;
	/** Interval of the plan. */
	interval: IntervalOptionT;
	/** Whether to send invoices to customers. */
	send_invoices: boolean;
	/** Whether to send SMS messages to customers. */
	send_sms: boolean;
	/** Whether the plan has a hosted page. */
	hosted_page: boolean;
	/** URL of the hosted page. */
	hosted_page_url?: string | null;
	/** Summary of the hosted page. */
	hosted_page_summary?: unknown | null;
	/** Currency of the amount. */
	currency: CurrencyOptionT;
} & IdAndTimestampsT;
