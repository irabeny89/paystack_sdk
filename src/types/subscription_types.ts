import type {
	AuthorizationT,
	DomainOptionT,
	IdAndTimestampsT,
	MetaDataT,
	RiskActionOptionT,
} from "./global";
import type { PlanDataT } from "./plan_types";

/**
 * Represents a subscription.
 */
export type SubscriptionT = {
	/** ID of the customer. */
	customer: number;
	/** ID of the plan. */
	plan: number;
	/** ID of the integration. */
	integration: number;
	/** Domain of the subscription. */
	domain: string;
	/** Start date of the subscription. */
	start: number;
	/** Status of the subscription. */
	// TODO: use string union
	// ? create string union in subscription_type.ts file
	status: string;
	/** Quantity of the subscription. */
	quantity: number;
	/** Amount of the subscription. */
	amount: number;
	/** Code of the subscription. */
	subscription_code: string;
	/** Email token for the subscription. */
	email_token?: string | null;
	/** Authorization details for the subscription. */
	authorization: AuthorizationT;
	/** ID of the easy cron job. */
	easy_cron_id?: unknown | null;
	/** Cron expression for the subscription. */
	cron_expression?: string;
	/** Next payment date for the subscription. */
	next_payment_date: string;
	/** Open invoice for the subscription. */
	open_invoice?: unknown | null;
} & IdAndTimestampsT;

/**
 * Parameters for creating a subscription.
 */
export type CreateBodyParamsT = {
	/** Customer's email or code. */
	customer: string;
	/** Plan code. */
	plan: string;
	/** If customer has multiple authorizations, you can set the desired authorization you wish to use for this subscription here. If this is not supplied, the customer's most recent authorization would be used. */
	authorization?: string;
	/** Set the date for the first debit. (ISO 8601 format) e.g. 2017-05-16T00:30:13+01:00 */
	startDate?: string;
};

/**
 * Query parameters for listing subscriptions.
 */
export type ListSubscriptionQueryParamsT = {
	/** Number of subscriptions per page. Default: 50 */
	perPage?: number;
	/** Page number. Default: 1 */
	page?: number;
	/** Filter by Customer ID. */
	customer?: string;
	/** Filter by Plan ID. */
	plan?: string;
};

/**
 * Represents a customer.
 */
type CustomerT = {
	/** Customer's first name. */
	first_name: string;
	/** Customer's last name. */
	last_name: string;
	/** Customer's email. */
	email: string;
	/** Customer's phone number. */
	phone: string;
	/** Customer's metadata. */
	metadata: MetaDataT | null;
	/** Customer's domain. */
	domain: DomainOptionT;
	/** Customer's code. */
	customer_code: string;
	/** Customer's risk action. */
	risk_action: RiskActionOptionT;
	/** Customer's integration ID. */
	integration: number;
} & IdAndTimestampsT;

/**
 * Response data for listing subscriptions.
 */
export type ListSubscriptionResponseDataT = {
	/** Customer details. */
	customer: CustomerT;
	/** Plan details. */
	plan: PlanDataT;
	/** Authorization details. */
	authorization: AuthorizationT;
	/** Domain details. */
	domain: DomainOptionT;
} & SubscriptionT;

/**
 * Parameters for enabling or disabling a subscription.
 */
export type EnableDisableBodyParamsT = {
	/** Subscription code. */
	code: string;
	/** Email token. */
	token: string;
};

/**
 * Response data for fetching a subscription.
 */
export type FetchResponseDataT = {
	/** Invoice details. */
	invoice: unknown[];
	/** Customer details. */
	customer: CustomerT;
	/** Plan details. */
	plan: PlanDataT;
	/** Integration ID. */
	integration: number;
	/** Authorization details. */
	authorization: AuthorizationT;
} & SubscriptionT;
