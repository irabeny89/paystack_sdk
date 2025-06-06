/**
 * Query parameters for resolving an account.
 */
export type ResolveAccountQueryParamsT = {
	/** The account number. */
	account_number: string;
	/** The bank code. You can get the list of bank codes by calling the List Banks endpoint or verification.listBank instance method. */
	bank_code: string;
};

/**
 * Response data for resolving an account.
 */
export type ResolveAccountResponseDataT = {
	/** The account number. */
	account_number: string;
	/** The account name. */
	account_name: string;
};

/**
 * Body parameters for validating an account.
 */
export type ValidateAccountBodyParamsT = {
	/** Customer's first and last name registered with their bank. */
	account_name: string;
	/** Customer’s account number. */
	account_number: string;
	/** Customer’s account type. This can take one of: [ `personal`, `business` ]. */
	account_type: "personal" | "business";
	/** The bank code of the customer’s bank. You can fetch the bank codes by using our List Banks endpoint. */
	bank_code: string;
	/** The two digit ISO code of the customer’s bank. */
	country_code: string;
	/** Customer’s mode of identity. This could be one of: [ `identityNumber`, `passportNumber`, `businessRegistrationNumber` ]. */
	document_type:
		| "identityNumber"
		| "passportNumber"
		| "businessRegistrationNumber";
	/** Customers' mode of identity number. */
	document_number?: string;
};

/**
 * Response data for resolving a card BIN.
 */
export type ResolveCardBinResponseDataT = {
	/** The BIN number. */
	bin: string;
	/** The card brand. */
	brand: string;
	/** The card sub-brand. */
	sub_brand: string;
	/** The country code. */
	country_code: string;
	/** The country name. */
	country_name: string;
	/** The card type. */
	card_type: string;
	/** The bank name. */
	bank: string;
	/** The linked bank ID. */
	linked_bank_id: string;
};
