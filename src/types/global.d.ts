import type { Level } from "pino";

export type JsonDataTypeOptionT = string | number | boolean;

export type IdAndTimestampsT = {
	id: number;
	/** ISO Date string eg 2017-02-03T17:21:54.508Z */
	createdAt: string;
	/** ISO Date string eg 2017-02-03T17:21:54.508Z */
	updatedAt: string;
};

export type StatusAndMessageT = {
	status: boolean;
	message: string;
};

export type ResponseDataT<T> = {
	data: T;
} & StatusAndMessageT;

export type PaginatedResponseT<T> = {
	meta: Record<"total" | "skipped" | "perPage" | "page" | "pageCount", number>;
	data: T[];
} & StatusAndMessageT;

export type MetaDataCustomFieldT = {
	display_name: string;
	variable_name: string;
	value: JsonDataTypeOptionT;
};

export type MetaDataCustomFilterT = {
	recurring: boolean;
	banks: string[];
	card_brands: CardBrandOptionT[];
};

export type UserDefinedMetaDataFieldsT = { [k: string]: JsonDataTypeOptionT };

export type MetaDataT = Partial<
	UserDefinedMetaDataFieldsT & {
		custom_fields: MetaDataCustomFieldT[];
		cancel_action: string;
	}
>;

export type ListQueryParamsT = {
	/** default: 50 */
	perPage?: number;
	/** default: 1 */
	page?: number;
	/** eg 2023-04-01T16:10:02.355Z or 2023-04-01 */
	from?: string;
	/** eg 2023-04-01T16:10:02.355Z or 2023-04-01 */
	to?: string;
};

export type CurrencyOptionT = "NGN" | "GHS" | "ZAR" | "USD";

export type CardBrandOptionT = "visa" | "verve" | "mastercard";

export type PaymentChannelOptionT = "card" | "bank" | "ussd" | "qr";

export type DomainOptionT = "test" | "live";

export type GatewayResponseOptionT = "declined" | "successful";

export type RiskActionOptionT = "default" | "deny";

export type RecipientOptionT = "nuban" | "basa" | "mobile_money";

/** Interval in words. Valid intervals are: daily, weekly, monthly,quarterly, biannually (every 6 months), annually. */
export type IntervalOptionT =
	| "daily"
	| "weekly"
	| "monthly"
	| "quarterly"
	| "biannually"
	| "annually";

export type OptionT = {
	/**
	 * Debug levels are:
	 * 1:`fatal`
	 * 2:`error`
	 * 3:`warn`
	 * 4:`info`
	 * 5:`debug`
	 * 6:`trace`
	 * 7:`silent`.
	 * This will stop at `trace` if set to `true` or `info` otherwise. Passing `silent` disables logging.
	 * */
	logLevel?: Level | "silent";
};

export type AuthorizationT = {
	authorization_code?: string | null;
	bin?: string | null;
	last4?: string | null;
	exp_month?: string | null;
	exp_year?: string | null;
	channel?: PaymentChannelOptionT | null;
	card_type?: CardBrandOptionT | null;
	bank?: string | null;
	account_name?: string | null;
	country_code?: string | null;
	brand?: PaymentChannelOptionT | null;
	reusable?: boolean | null;
	signature?: string | null;
};

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

export type ApiError = {
  status: boolean
  message: string
  meta: Record<"nextStep", string>
  type: string
  code: string
}