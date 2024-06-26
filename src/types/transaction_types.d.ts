import {
	CardBrandOptionT,
	CurrencyOptionT,
	DomainOptionT,
	GatewayResponseOptionT,
	ListQueryParamsT,
	MetaDataT,
	PaymentChannelOptionT,
	RiskActionOptionT,
	StatusOptionT,
} from "./global";

type TransactionBearerOptionT = "account" | "subaccount";

type TransactionHistoryTypeOptionT =
	| "success"
	| "action"
	| "open"
	| "input"
	| "error"
	| "close";

type TransactionResponseAuthorizationT = {
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

type TransactionResponseCustomerT = {
	id?: string | null;
	first_name?: string | null;
	last_name?: string | null;
	email?: string | null;
	customer_code?: string | null;
	phone?: string | null;
	metadata?: MetaDataT | null;
	risk_action?: RiskActionOptionT | null;
	international_format?: string | null;
};

type TransactionHistoryT = {
	type: TransactionHistoryTypeOptionT;
	message: string;
	time: number;
};

type TransactionResponseLogT = {
	start_time: number;
	time_spent: number;
	attempts: number;
	errors: number;
	success: boolean;
	mobile: boolean;
	input: [];
	history: TransactionHistoryT[];
};

type TransactionByCurrencyT = {
	currency: CurrencyOptionT;
	/** amount specified in lowest denominations eg: `NGN kobo` etc */
	amount: number;
};

export type TransactionInitializeBodyParamsT = {
	/** amount specified in lowest denominations eg: `NGN kobo` etc */
	amount: string;
	/** customer's email */
	email: string;
	/** currency to charge in eg NGN, GHS, ZAR or USD */
	currency?: CurrencyOptionT;
	/** unique alpha-numeric reference */
	reference?: string;
	/** used to override the callback url to redirect to after pay set on the dashboard eg https://e.com/ */
	callback_url?: string;
	/** used to convert this transaction to subscription with the predefined plan code. this would invalidate amount here and use the one specified on subscription */
	plan?: string;
	/** number of times to charge customer during subscription plan */
	invoice_limit?: number;
	/** stringified JSON with format @see {@link TransactionMetaDataT} */
	metadata?: string;
	/** payment channels that would be available on the returned link `authorization_url` */
	channels?: PaymentChannelOptionT[];
	/** use for transaction split eg SPL_8fl... */
	split_code?: string;
	/** sub account code that owns the pay eg ACCT_8ef... */
	subaccount?: string;
	/** used to override the split config for single payment. If set, the amount specified goes to the main account regardless of the split config */
	transaction_charge?: number;
	/** who bears charges? `account` or `subaccount` (defualts to `account`) */
	bearer?: string;
};

export type TransactionChargeAuthorizationBodyParamsT = {
	/** filter by amount; specify in lowest denominations eg: `NGN kobo` etc */
	amount: string;
	/** customer's email attached to the authorization code */
	email: string;
	/** valid authorization code to charge; this are available from last payment */
	authorization_code: string;
	/** unique alpha-numeric reference */
	reference?: string;
	/** currency to charge in eg NGN, GHS, ZAR or USD */
	currency?: CurrencyOptionT;
	/** stringified json object
	 * @see {@link TransactionMetaDataT} */
	metadata?: string;
	/** send `card` or `bank` or `card,bank` as an array for options to show the user paying */
	channel?: PaymentChannelOptionT[];
	/** code for subaccount that owns the payment eg ACCT_8f4s1eq7ml6rlzj */
	subaccount?: string;
	/** a flat fee to charge the subaccount for this transaction in lowest denominations */
	transaction_charge?: number;
	/** who bears Paystack charges eg account or subaccount */
	bearer?: TransactionBearerOptionT;
	/** if you are making a schedule charge call, it is a good idea to queue them to avoid transaction processing error */
	queue?: boolean;
};

export type TransactionPartialDebitBodyParamsT = {
	/** valid authorization code to charge; this are available from past payments */
	authorization_code: string;
	/** currency to charge in eg NGN, GHS, ZAR or USD */
	currency: CurrencyOptionT;
	/** filter by amount; specify in lowest denominations eg: `NGN kobo` etc */
	amount: string;
	/** customer's email attached to the authorization code */
	email: string;
	/** unique alpha-numeric reference */
	reference?: string;
	/** minimum amount to charge */
	at_least?: string;
};

export type TransactionListQueryParamsT = {
	/** target customer id */
	customer?: number;
	/** target terminal */
	terminalid?: string;
	/** filter by status eg failed, success or abandoned */
	status?: StatusOptionT;
	/** filter by amount; specify in lowest denominations eg: `NGN kobo` etc */
	amount?: number;
} & ListQueryParamsT;

export type TransactionExportParamsT = {
	/** target customer id */
	customer?: number;
	/** filter by status eg failed, success or abandoned */
	status?: StatusOptionT;
	/** specify transaction currency to export eg NGN, GHS, ZAR, USD */
	currency?: CurrencyOptionT;
	/** filter by amount; specify in lowest denominations eg: `NGN kobo` etc */
	amount?: number;
	/** `true` to export settled, `false` for pending and undefined to export all */
	settled?: boolean;
	/** id for the settlement whose transaction should be exported */
	settlement?: number;
	/** specify a payment page's id to export only transactions conducted on said page */
	payment_page?: number;
} & ListQueryParamsT;

export type TransactionTotalsQueryParamsT = ListQueryParamsT;

export type TransactionInitializeResponseDataT = {
	/** redirect link to complete payment */
	authorization_url: string;
	/** access code */
	access_code: string;
	/** transaction reference */
	reference: string;
};

export type TransactionResponseDataT = {
	id?: number | null;
	domain?: DomainOptionT | null;
	status?: StatusOptionT | null;
	reference?: string | null;
	amount?: number | null;
	message?: string | null;
	gateway_response?: GatewayResponseOptionT | null;
	paid_at?: string | null;
	created_at?: string | null;
	channel?: PaymentChannelOptionT | null;
	currency?: CurrencyOptionT | null;
	ip_address?: string | null;
	metadata?: MetaDataT | null;
	log?: TransactionResponseLogT | null;
	fees?: number | null;
	paidAt?: string | null;
	authorization?: TransactionResponseAuthorizationT | null;
	fees_split?: any | null;
	customer?: TransactionResponseCustomerT | null;
	plan?: any | null;
	split?: object | null;
	order_id?: any | null;
	createdAt?: string | null;
	requested_amount?: number | null;
	pos_transaction_data?: any | null;
	source?: any | null;
	fees_breakdown?: any | null;
	transaction_date?: string | null;
	plan_object?: object | null;
	subaccount?: object | null;
	timeline?: any | null;
};

export type TransactionTimelineResponseDataT = {
	time_spent: number;
	attempts: number;
	authentication: null;
	errors: number;
	success: boolean;
	mobile: boolean;
	input: any[];
	channel: PaymentChannelOptionT;
	history: TransactionHistoryT[];
};

export type TransactionTotalsResponseDataT = {
	total_transactions: number;
	unique_customers: number;
	total_volume: number;
	total_volume_by_currency: TransactionByCurrencyT[];
	pending_transfers: number;
	pending_transfers_by_currency: TransactionByCurrencyT[];
};

export type TransactionExportResponseDataT = Record<"path", string>;
