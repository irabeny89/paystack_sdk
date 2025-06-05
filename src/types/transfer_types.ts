import type {
  CurrencyOptionT,
  DomainOptionT,
  IdAndTimestampsT,
  ListQueryParamsT,
  MetaDataT,
  RecipientOptionT,
} from "./global";

/** Source of funds for a transfer. Currently, only "balance" is supported. */
type TransferSourceT = "balance";

/** Status of a transfer. */
/** - `otp`: OTP is required to finalize the transfer. */
/** - `pending`: Transfer is pending, typically because OTP is disabled or not yet submitted. */
/** - `success`: Transfer was successful. */
/** - `received`: Transfer was received by the recipient. */
type TransferStatusT = "otp" | "pending" | "success" | "received";

/** Parameters for initializing a bulk transfer. */
type InitializeBulkTransferT = {
  /** Amount to transfer.  In kobo for NGN and pesewas for GHS. */
  amount: number;
  /** Optional unique identifier for the transfer. Must be lowercase alphanumeric, with hyphens and underscores allowed. */
  reference?: string;
  /** Code of the recipient for the transfer. */
  recipient: string;
  /** Reason for the transfer. */
  reason?: string;
};

/** Details of a transfer recipient. */
type RecipientDetailsT = {
  /** Recipient's account number. */
  account_number: string;
  /** Recipient's account name. Can be null. */
  account_name: string | null;
  /** Recipient's bank code. */
  bank_code: string;
  /** Recipient's bank name. */
  bank_name: string;
};

/** Details of a transfer recipient. */
type ListRecipientT = {
  /** Domain of the recipient. */
  domain: string;
  /** Type of recipient. */
  type: RecipientOptionT;
  /** Currency of the recipient. */
  currency: CurrencyOptionT;
  /** Name of the recipient. */
  name: string;
  /** Details of the recipient's account. */
  details: RecipientDetailsT;
  /** Description of the recipient. */
  description: string;
  /** Metadata associated with the recipient. Can be null. */
  metadata: null | MetaDataT;
  /** Unique code for the recipient. */
  recipient_code: string;
  /** Whether the recipient is active. */
  active: boolean;
  /** ID of the recipient. */
  id: number;
  /** Integration ID of the recipient. */
  integration: number;
  /** Timestamp of recipient creation. */
  createdAt: string;
  /** Timestamp of last recipient update. */
  updatedAt: string;
};

/** Parameters for initiating a transfer. */
export type InitiateBodyParamsT = {
  /** Source of funds for the transfer. Only "balance" is supported. */
  source: TransferSourceT;
  /** Amount to transfer. In kobo for NGN and pesewas for GHS. */
  amount: number;
  /** Code of the recipient for the transfer. */
  recipient: string;
  /** Reason for the transfer. */
  reason?: string;
  /** Currency of the transfer. Defaults to NGN. */
  currency?: CurrencyOptionT;
  /** Optional unique identifier for the transfer. Must be lowercase alphanumeric, with hyphens and underscores allowed. */
  reference?: string;
};

/** Parameters for finalizing a transfer. */
export type FinalizeBodyParamsT = {
  /** Code of the transfer to finalize. */
  transfer_code: string;
  /** OTP code to verify the transfer. */
  otp: string;
};

/** Parameters for initiating a bulk transfer. */
export type InitiateBulkBodyParamsT = {
  /** Source of funds for the transfer. Only "balance" is supported. */
  source: TransferSourceT;
  /** Currency of the transfer. Defaults to NGN. */
  currency?: CurrencyOptionT;
  /** Array of transfer objects, each containing amount, recipient, and reference. */
  transfers: InitializeBulkTransferT[];
};

/** Response data for initializing a bulk transfer. */
export type InitializeBulkResponseDataT = {
  /** Reference of the bulk transfer. */
  reference: string;
  /** Code of the recipient for the transfer. */
  recipient: string;
  /** Amount transferred. */
  amount: number;
  /** Code of the transfer. */
  transfer_code: string;
  /** Currency of the transfer. */
  currency: CurrencyOptionT;
  /** Status of the transfer. */
  status: TransferStatusT;
};

/** Query parameters for listing transfers. */
export type ListTransferQueryParamsT = {
  /** Optional filter by customer ID. */
  customer?: string;
} & ListQueryParamsT;

/** Response data for a single transfer. */
export type TransferResponseDataT = {
  /** Integration ID. */
  integration: number;
  /** Domain of the transfer. */
  domain: DomainOptionT;
  /** Amount transferred. In kobo for NGN and pesewas for GHS. */
  amount: number;
  /** Currency of the transfer. */
  currency: CurrencyOptionT;
  /** Source of funds for the transfer. Only "balance" is supported. */
  source: TransferSourceT;
  /** Reason for the transfer. */
  reason: string;
  /** ID of the recipient. */
  recipient: number;
  /** Status of the transfer. */
  status: TransferStatusT;
  /** Code of the transfer. */
  transfer_code: string;
  /** Optional reference for the transfer. */
  reference?: string;
  /** Source details. Currently always null. */
  source_details?: null;
  /** Failures. Currently always null. */
  failures?: null;
  /** Titan code. Currently always null. */
  titan_code?: null;
  /** Timestamp of transfer. Currently always null. */
  transferred_at?: null;
} & IdAndTimestampsT;

/** Response data for a single transfer (list context). */
export type ListResponseDataT = {
  /** Integration ID. */
  integration: number;
  /** Recipient details. */
  recipient: ListRecipientT;
  /** Domain of the transfer. */
  domain: string;
  /** Amount transferred. */
  amount: number;
  /** Currency of the transfer. */
  currency: CurrencyOptionT;
  /** Source of funds for the transfer. Only "balance" is supported. */
  source: TransferSourceT;
  /** Source details. Currently always null. */
  source_details: null;
  /** Reason for the transfer. */
  reason: string;
  /** Status of the transfer. */
  status: TransferStatusT;
  /** Failures. Currently always null. */
  failures: null;
  /** Code of the transfer. */
  transfer_code: string;
} & IdAndTimestampsT;

/** Response data for verifying a recipient. */
export type VerifyResponseDataT = {
  /** Description of the recipient. */
  description: string;
  /** Whether the recipient is active. */
  active: boolean;
  /** Email of the recipient. */
  email: string;
} & TransferResponseDataT;
