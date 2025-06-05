import type {
  /** Currency options */
  CurrencyOptionT,
  /** Domain options */
  DomainOptionT,
  /** ID and timestamps */
  IdAndTimestampsT,
  /** Metadata */
  MetaDataT,
  /** Recipient options */
  RecipientOptionT,
} from "./global";

/** Details of a recipient */
type DetailT = {
  /** Authorization code (optional) */
  authorization_code?: null;
  /** Account number */
  account_number: string;
  /** Account name */
  account_name: string;
  /** Bank code */
  bank_code: string;
  /** Bank name */
  bank_name: string;
};

/** Parameters for creating a recipient using Nuban or Basa */
type NubanOrBasaBodyParamsT = {
  /** Recipient type: `nuban`, `basa`, or `mobile_money`.
   * `nuban` for Nigeria, `mobile_money` for Ghana and `basa` for S.Africa.
   */
  type: Omit<RecipientOptionT, "mobile_money">;
  /** Bank code. Required if type is `nuban` or `basa`. You can get bank list from the `List Banks` API on Paystack docs */
  bank_code: string;
  /** Account number. Required if type is `nuban` or `basa` */
  account_number: string;
  /** Currency for the account receiving the transfer */
  currency?: CurrencyOptionT;
  /** Name for the recipient */
  name?: string;
  /** Description for this recipient */
  description?: string;
  /** Authorization code from the previous transaction */
  authorization_code?: string;
  /** Additional data about the recipient (e.g., name, email) */
  metadata?: MetaDataT;
};

/** Parameters for creating a mobile money recipient */
type MobileMoneyBodyParamsT = Omit<
  NubanOrBasaBodyParamsT,
  "bank_code" | "account_number" | "type"
> &
  Record<"type", "mobile_money">;

/** Parameters for creating a recipient */
export type CreateBodyParamsT<T extends RecipientOptionT> =
  T extends "mobile_money" ? MobileMoneyBodyParamsT : NubanOrBasaBodyParamsT;

/** Parameters for bulk creating recipients */
export type BulkCreateBodyParamsT = {
  /** List of transfer recipient objects. Each object should contain required fields for recipient type (`nuban`, `basa` or `mobile_money`) option.
   * Parameters passed in single create can be used as well.
   */
  batch: (MobileMoneyBodyParamsT | NubanOrBasaBodyParamsT)[];
};

/** Response data for a single recipient */
export type TransferRecipientResponseDataT = {
  /** Integration ID */
  integration: number;
  /** Recipient name */
  name: string;
  /** Recipient code */
  recipient_code: string;
  /** Recipient type */
  type: RecipientOptionT;
  /** Whether the recipient is active */
  active: boolean;
  /** Recipient currency */
  currency: CurrencyOptionT;
  /** Recipient domain */
  domain: DomainOptionT;
  /** Whether the recipient is deleted */
  is_deleted: boolean;
  /** Recipient details */
  details: DetailT;
  /** Recipient description (optional) */
  description?: string;
  /** Recipient metadata (optional) */
  metadata?: null | MetaDataT;
} & IdAndTimestampsT;

/** Response data for bulk recipient creation */
export type BulkCreateResponseDataT = {
  /** Successfully created recipients */
  success: TransferRecipientResponseDataT[];
  /** Errors encountered during creation */
  errors: unknown[];
};
