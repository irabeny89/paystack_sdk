import type {
	CurrencyOptionT,
	DomainOptionT,
	IdAndTimestampsT,
	MetaDataT,
	RecipientOptionT,
} from "./global";

type DetailT = {
	authorization_code?: null;
	account_number: string;
	account_name: string;
	bank_code: string;
	bank_name: string;
};

type NubanOrBasaBodyParamsT = {
	/** recipient type: `nuban`, `basa`, or `mobile_money`.
	 * `nuban` for Nigeria, `mobile_money` for Ghana and `basa` for S.Africa.
	 */
	type: Omit<RecipientOptionT, "mobile_money">;
	/** required if type is `nuban` or `basa`. You can get bank list from the `List Banks` API on Paystack docs */
	bank_code: string;
	/** required if type is `nuban` or `basa` */
	account_number: string;
	/** currency for the account receiving the transfer */
	currency?: CurrencyOptionT;
	/** a name for the recipient */
	name?: string;
	/** a description for this recipient */
	description?: string;
	/** an authorization code from the previous transaction */
	authorization_code?: string;
	/** add additional data about the recipient eg name, email etc */
	metadata?: MetaDataT;
};

type MobileMoneyBodyParamsT = Omit<
	NubanOrBasaBodyParamsT,
	"bank_code" | "account_number" | "type"
> &
	Record<"type", "mobile_money">;

export type CreateBodyParamsT<T extends RecipientOptionT> =
	T extends "mobile_money" ? MobileMoneyBodyParamsT : NubanOrBasaBodyParamsT;

export type BulkCreateBodyParamsT = {
	/** list of transfer recipient object. Each object should contain required fields for recipient type(`nuban`, `basa` or `mobile_money`) option.
	 * Parameters passed in single create can be used as well.
	 */
	batch: (MobileMoneyBodyParamsT | NubanOrBasaBodyParamsT)[];
};

export type TransferRecipientResponseDataT = {
	integration: number;
	name: string;
	recipient_code: string;
	type: RecipientOptionT;
	active: boolean;
	currency: CurrencyOptionT;
	domain: DomainOptionT;
	is_deleted: boolean;
	details: DetailT;
	description?: string;
	metadata?: null | MetaDataT;
} & IdAndTimestampsT;

export type BulkCreateResponseDataT = {
	success: TransferRecipientResponseDataT[];
	errors: unknown[];
};
