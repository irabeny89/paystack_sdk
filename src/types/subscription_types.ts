import type {
	AuthorizationT,
	DomainOptionT,
	IdAndTimestampsT,
	MetaDataT,
	RiskActionOptionT,
} from "./global";
import type { PlanDataT } from "./plan_types";

export type SubscriptionT = {
	customer: number;
	plan: number;
	integration: number;
	domain: string;
	start: number;
	// TODO: use string union
	// ? create string union in subscription_type.ts file
	status: string;
	quantity: number;
	amount: number;
	subscription_code: string;
	email_token?: string | null;
	authorization: AuthorizationT;
	easy_cron_id?: unknown | null;
	cron_expression?: string;
	next_payment_date: string;
	open_invoice?: unknown | null;
} & IdAndTimestampsT;

export type CreateBodyParamsT = {
	/** Customer's email or code */
	customer: string;
	/** Plan code */
	plan: string;
	/** If customer has multiple authorizations, you can set the desired authorization you wish to use for this subscription here. If this is not supplied, the customer's most recent authorization would be used */
	authorization?: string;
	/** Set the date for the first debit. (ISO 8601 format) e.g. 2017-05-16T00:30:13+01:00 */
	startDate?: string;
};

export type ListQueryParamsT = {
	/** Default: 50 */
	perPage?: number;
	/** Default: 1 */
	page?: number;
	/** Filter by Customer ID */
	customer?: string;
	/** Filter by Plan ID */
	plan?: string;
};

type CustomerT = {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	metadata: MetaDataT | null;
	domain: DomainOptionT;
	customer_code: string;
	risk_action: RiskActionOptionT;
	integration: number;
} & IdAndTimestampsT;

export type ListResponseDataT = {
	customer: CustomerT;
	plan: PlanDataT;
	authorization: AuthorizationT;
	domain: DomainOptionT;
} & SubscriptionT;

export type EnableDisableBodyParamsT = {
	/** Subscription code */
	code: string;
	/** Email token */
	token: string;
};

export type FetchResponseDataT = {
	invoice: unknown[]
	customer: CustomerT
	plan: PlanDataT
	integration: number
	authorization: AuthorizationT
} & SubscriptionT;
