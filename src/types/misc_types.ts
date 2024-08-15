import type {
	CountryOptionT,
	CurrencyOptionT,
	GatewayOptionT,
	IdAndTimestampsT,
} from "./global";

export type ListBankQueryParamsT = {
	/** The country from which to obtain the list of supported banks. Accepted values are: `ghana`, `kenya`, `nigeria`, `south africa`. */
	country: CountryOptionT;
	/** Flag to enable cursor pagination on the endpoint. */
	use_cursor?: boolean;
	/** The number of objects to return per page. Defaults to 50, and limited to 100 records per page. */
	perPage?: number;
	/** A flag to filter for available banks a customer can make a transfer to complete a payment. */
	pay_with_bank_transfer?: boolean;
	/** A flag to filter for banks a customer can pay directly from. */
	pay_with_bank?: boolean;
	/** A flag to filter the banks that are supported for account verification in South Africa. You need to combine this with either the currency or country filter. */
	enable_for_verification?: boolean;
	/** A cursor that indicates your place in the list. It can be used to fetch the next page of the list. */
	next?: string;
	/** A cursor that indicates your place in the list. It should be used to fetch the previous page of the list after an intial next request. */
	previous?: string;
	/** The gateway type of the bank. It can be one of these: [`emandate`, `digitalbankmandate`]  */
	gateway?: GatewayOptionT;
	/** Type of financial channel. For Ghanaian channels, please use either mobile_money for mobile money channels OR ghipps for bank channels */
	type?: string;
	/** One of the supported currencies. */
	currency: CurrencyOptionT;
};

export type ListBankResponseDataT = {
	name: string;
	slug: string;
	code: string;
	longcode: string;
	gateway: string | null;
	pay_with_bank: boolean;
	active: boolean;
	is_deleted: boolean;
	country: string;
	currency: CurrencyOptionT;
	type: string;
} & IdAndTimestampsT;

export type ListCountriesResponseDataT = {
	id: 1;
	name: string;
	iso_code: string;
	default_currency_code: CurrencyOptionT;
	integration_defaults: object;
	relationships: {
		currency: {
			type: string;
			data: string[];
		};
		integration_feature: {
			type: string;
			data: string[];
		};
		integration_type: {
			type: string;
			data: string[];
		};
		payment_method: {
			type: string;
			data: string[];
		};
	};
};

export type ListStatesResponseDataT = {
	name: string;
	slug: string;
	abbreviation: string;
};
