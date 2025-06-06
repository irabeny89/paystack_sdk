import type {
	/**
	 * Represents a country option.
	 */
	CountryOptionT,
	/**
	 * Represents a currency option.
	 */
	CurrencyOptionT,
	/**
	 * Represents a gateway option.
	 */
	GatewayOptionT,
	/**
	 * Represents an ID and timestamps object.
	 */
	IdAndTimestampsT,
} from "./global";

/**
 * Query parameters for listing banks.
 */
export type ListBankQueryParamsT = {
	/**
	 * The country from which to obtain the list of supported banks. Accepted values are: `ghana`, `kenya`, `nigeria`, `south africa`.
	 */
	country: CountryOptionT;
	/**
	 * Flag to enable cursor pagination on the endpoint.
	 */
	use_cursor?: boolean;
	/**
	 * The number of objects to return per page. Defaults to 50, and limited to 100 records per page.
	 */
	perPage?: number;
	/**
	 * A flag to filter for available banks a customer can make a transfer to complete a payment.
	 */
	pay_with_bank_transfer?: boolean;
	/**
	 * A flag to filter for banks a customer can pay directly from.
	 */
	pay_with_bank?: boolean;
	/**
	 * A flag to filter the banks that are supported for account verification in South Africa. You need to combine this with either the currency or country filter.
	 */
	enable_for_verification?: boolean;
	/**
	 * A cursor that indicates your place in the list. It can be used to fetch the next page of the list.
	 */
	next?: string;
	/**
	 * A cursor that indicates your place in the list. It should be used to fetch the previous page of the list after an initial next request.
	 */
	previous?: string;
	/**
	 * The gateway type of the bank. It can be one of these: [`emandate`, `digitalbankmandate`]
	 */
	gateway?: GatewayOptionT;
	/**
	 * Type of financial channel. For Ghanaian channels, please use either mobile_money for mobile money channels OR ghipps for bank channels
	 */
	type?: string;
	/**
	 * One of the supported currencies.
	 */
	currency: CurrencyOptionT;
};

/**
 * Response data for listing banks.
 */
export type ListBankResponseDataT = {
	/**
	 * The name of the bank.
	 */
	name: string;
	/**
	 * The slug of the bank.
	 */
	slug: string;
	/**
	 * The code of the bank.
	 */
	code: string;
	/**
	 * The long code of the bank.
	 */
	longcode: string;
	/**
	 * The gateway of the bank.
	 */
	gateway: string | null;
	/**
	 * Indicates whether the bank can be used to pay with bank transfer.
	 */
	pay_with_bank: boolean;
	/**
	 * Indicates whether the bank is active.
	 */
	active: boolean;
	/**
	 * Indicates whether the bank is deleted.
	 */
	is_deleted: boolean;
	/**
	 * The country of the bank.
	 */
	country: string;
	/**
	 * The currency of the bank.
	 */
	currency: CurrencyOptionT;
	/**
	 * The type of the bank.
	 */
	type: string;
} & IdAndTimestampsT;

/**
 * Response data for listing countries.
 */
export type ListCountriesResponseDataT = {
	/**
	 * The ID of the country.
	 */
	id: 1;
	/**
	 * The name of the country.
	 */
	name: string;
	/**
	 * The ISO code of the country.
	 */
	iso_code: string;
	/**
	 * The default currency code of the country.
	 */
	default_currency_code: CurrencyOptionT;
	/**
	 * Integration defaults for the country.
	 */
	integration_defaults: object;
	/**
	 * Relationships for the country.
	 */
	relationships: {
		/**
		 * Currency relationships.
		 */
		currency: {
			/**
			 * The type of currency.
			 */
			type: string;
			/**
			 * The data of currency.
			 */
			data: string[];
		};
		/**
		 * Integration feature relationships.
		 */
		integration_feature: {
			/**
			 * The type of integration feature.
			 */
			type: string;
			/**
			 * The data of integration feature.
			 */
			data: string[];
		};
		/**
		 * Integration type relationships.
		 */
		integration_type: {
			/**
			 * The type of integration type.
			 */
			type: string;
			/**
			 * The data of integration type.
			 */
			data: string[];
		};
		/**
		 * Payment method relationships.
		 */
		payment_method: {
			/**
			 * The type of payment method.
			 */
			type: string;
			/**
			 * The data of payment method.
			 */
			data: string[];
		};
	};
};

/**
 * Response data for listing states.
 */
export type ListStatesResponseDataT = {
	/**
	 * The name of the state.
	 */
	name: string;
	/**
	 * The slug of the state.
	 */
	slug: string;
	/**
	 * The abbreviation of the state.
	 */
	abbreviation: string;
};
