import { Level } from "pino";

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
	/** eg 2023-04-01T16:10:02.355Z, 2023-04-01 */
	from?: string;
	/** eg 2023-04-01T16:10:02.355Z, 2023-04-01 */
	to?: string;
};

export type CurrencyOptionT = "NGN" | "GHS" | "ZAR" | "USD";

export type CardBrandOptionT = "visa" | "verve" | "mastercard";

export type PaymentChannelOptionT = "card" | "bank" | "ussd" | "qr";

export type StatusOptionT = "failed" | "abandoned" | "success";

export type DomainOptionT = "test" | "live";

export type GatewayResponseOptionT = "declined" | "successful";

export type RiskActionOptionT = "default" | "deny";

export type RecipientTypeT = "nuban" | "basa" | "mobile_money";

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
