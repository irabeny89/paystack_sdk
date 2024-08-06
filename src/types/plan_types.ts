import type {
	CurrencyOptionT,
	DomainOptionT,
	IdAndTimestampsT,
	IntervalOptionT,
	ListQueryParamsT,
} from "./global";
import type { SubscriptionT } from "./subscription_types";

export type PlanBodyParamsT = {
	/** Name of plan. */
	name: string;
	/** Amount should be in the subunit of the supported currency. */
	amount: number;
	/** Interval in words. Valid intervals are: daily, weekly, monthly,quarterly, biannually (every 6 months), annually. */
	interval: IntervalOptionT;
	/** A description for this plan. Optional.*/
	description?: string;
	/** Set to false if you don't want invoices to be sent to your customers. Optional.*/
	send_invoices?: boolean;
	/** Set to false if you don't want text messages to be sent to your customers. Optional.*/
	send_sms?: string;
	/** Currency in which amount is set. Optional.*/
	currency?: CurrencyOptionT;
	/** Number of invoices to raise during subscription to this plan. Can be overridden by specifying an `invoice_limit` while subscribing. Optional.*/
	invoice_limit?: number;
};

export type PlanDataT = {
	name: string;
	amount: number;
	description?: string | null;
	interval: IntervalOptionT;
	integration: number;
	domain: DomainOptionT;
	plan_code: string;
	send_invoices: boolean;
	send_sms: boolean;
	hosted_page: boolean;
	hosted_page_url: string | null;
	hosted_page_summary: string | null;
	migrate: string | null;
	currency: CurrencyOptionT;
} & IdAndTimestampsT;

export type PlanListQueryParamsT = {
	/** Filter list by plans with specified status */
	status: string;
	/** Filter list by plans with specified interval */
	interval: string;
	/** Filter list by plans with specified amount using the supported currency */
	amount: number;
} & Pick<ListQueryParamsT, "page" | "perPage">;

export type PlanResponseDataT = {
	subscriptions: SubscriptionT[];
	integration: number;
	domain: DomainOptionT;
	name: string;
	plan_code: string;
	description?: string | null;
	amount: number;
	interval: IntervalOptionT;
	send_invoices: boolean;
	send_sms: boolean;
	hosted_page: boolean;
	hosted_page_url?: string | null;
	hosted_page_summary?: unknown | null;
	currency: CurrencyOptionT;
} & IdAndTimestampsT;
