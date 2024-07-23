import {
	CurrencyOptionT,
	DomainOptionT,
	IdAndTimestampsT,
	ListQueryParamsT,
	MetaDataT,
	RecipientOptionT,
} from "./global";

type TransferSourceT = "balance";
/** Status of transfer object returned will be `pending` if OTP is disabled. In the event that an OTP is required, status will read `otp`. */
type TransferStatusT = "otp" | "pending" | "success" | "received";

type InitializeBulkTransferT = {
	/** Amount to transfer in kobo if currency is `NGN` and `pesewas if currency is `GHS` */
	amount: number;
	/** If specified, the field should be a unique identifier (in lowercase) for the object. Only `-`, `_` & `alphanumeric` characters allowed. */
	reference?: string;
	/** Code for transfer recipient i.e the code from creating a transfer recipient. */
	recipient: string;
	/** The reason for the transfer. */
	reason?: string;
};

type RecipientDetailsT = {
	account_number: string;
	account_name: string | null;
	bank_code: string;
	bank_name: string;
};

type ListRecipientT = {
	domain: string;
	type: RecipientOptionT;
	currency: CurrencyOptionT;
	name: string;
	details: RecipientDetailsT;
	description: string;
	metadata: null | MetaDataT;
	recipient_code: string;
	active: boolean;
	id: number;
	integration: number;
	createdAt: string;
	updatedAt: string;
};

export type InitiateBodyParamsT = {
	/** Where should we transfer from? Only `balance` for now. */
	source: TransferSourceT;
	/** Amount to transfer in kobo if currency is `NGN` and `pesewas if currency is `GHS` */
	amount: number;
	/** Code for transfer recipient i.e the code from creating a transfer recipient. */
	recipient: string;
	/** The reason for the transfer. */
	reason?: string;
	/** Specify the currency of the transfer. Defaults to `NGN` */
	currency?: CurrencyOptionT;
	/** If specified, the field should be a unique identifier (in lowercase) for the object. Only `-`, `_` & `alphanumeric` characters allowed. */
	reference?: string;
};

export type FinalizeBodyParamsT = {
	/** The transfer code you want to finalize. eg TRF_vsyh... */
	transfer_code: string;
	/** OTP sent to business phone to verify transfer. */
	otp: string;
};

export type InitiateBulkBodyParamsT = {
	/** Where should we transfer from? Only `balance` for now. */
	source: TransferSourceT;
	/** Specify the currency of the transfer. Defaults to `NGN` */
	currency?: CurrencyOptionT;
	/** Each transfer object should contain `amount`, `recipient`, and `reference` */
	transfers: InitializeBulkTransferT[];
};

export type InitializeBulkResponseDataT = {
	reference: string;
	recipient: string;
	amount: number;
	transfer_code: string;
	currency: CurrencyOptionT;
	status: TransferStatusT;
};

export type ListTransferQueryParamsT = {
	/** Use to filter by customer id */
	customer?: string;
} & ListQueryParamsT;

export type TransferResponseDataT = {
	integration: number;
	domain: DomainOptionT;
	/** Amount to transfer in kobo if currency is `NGN` and `pesewas if currency is `GHS` */
	amount: number;
	currency: CurrencyOptionT;
	/** Where should we transfer from? Only `balance` for now. */
	source: TransferSourceT;
	reason: string;
	recipient: number;
	/** Status of transfer object returned will be `pending` if OTP is disabled. In the event that an OTP is required, status will read `otp`. */
	status: TransferStatusT;
	transfer_code: string;
	reference?: string;
	source_details?: null;
	failures?: null;
	titan_code?: null;
	transferred_at?: null;
} & IdAndTimestampsT;

export type ListResponseDataT = {
	integration: number;
	recipient: ListRecipientT;
	domain: string;
	amount: number;
	currency: CurrencyOptionT;
	/** Where should we transfer from? Only `balance` for now. */
	source: TransferSourceT;
	source_details: null;
	reason: string;
	/** Status of transfer object returned will be `pending` if OTP is disabled. In the event that an OTP is required, status will read `otp`. */
	status: TransferStatusT;
	failures: null;
	transfer_code: string;
} & IdAndTimestampsT;

export type VerifyResponseDataT = {
	description: string;
	active: boolean;
	email: string;
} & TransferResponseDataT;
