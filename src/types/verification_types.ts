export type ResolveAccountQueryParamsT = {
	account_number: string;
	/** You can get the list of bank codes by calling the List Banks endpoint or verification.listBank instance method */
	bank_code: string;
};

export type ResolveAccountResponseDataT = {
	account_number: string;
	account_name: string;
};

export type ValidateAccountBodyParamsT = {
	/** Customer's first and last name registered with their bank */
	account_name: string;
	/** Customer’s account number */
	account_number: string;
	/** This can take one of: [ `personal`, `business` ] */
	account_type: "personal" | "business";
	/** The bank code of the customer’s bank. You can fetch the bank codes by using our List Banks endpoint */
	bank_code: string;
	/** The two digit ISO code of the customer’s bank */
	country_code: string;
	/** Customer’s mode of identity. This could be one of: [ `identityNumber`, `passportNumber`, `businessRegistrationNumber` ]
	 */
	document_type:
		| "identityNumber"
		| "passportNumber"
		| "businessRegistrationNumber";
	/** Customers' mode of identity number */
	document_number?: string;
};

export type ResolveCardBinResponseDataT = {
	bin: string;
	brand: string;
	sub_brand: string;
	country_code: string;
	country_name: string;
	card_type: string;
	bank: string;
	linked_bank_id: string;
};
