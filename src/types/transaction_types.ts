import type {
  AuthorizationT,
  CurrencyOptionT,
  DomainOptionT,
  GatewayResponseOptionT,
  ListQueryParamsT,
  MetaDataT,
  PaymentChannelOptionT,
  RiskActionOptionT,
} from "./global";

/**
 * Status options for transactions.
 */
export type StatusOptionT = "failed" | "abandoned" | "success";

/**
 * Options for who bears the charges.
 */
type BearerOptionT = "account" | "subaccount";

/**
 * Options for the type of history event.
 */
type HistoryTypeOptionT =
  | "success"
  | "action"
  | "open"
  | "input"
  | "error"
  | "close";

/**
 * Represents a customer.
 */
type CustomerT = {
  /** Customer ID. */
  id?: string | null;
  /** Customer's first name. */
  first_name?: string | null;
  /** Customer's last name. */
  last_name?: string | null;
  /** Customer's email address. */
  email?: string | null;
  /** Customer code. */
  customer_code?: string | null;
  /** Customer's phone number. */
  phone?: string | null;
  /** Metadata associated with the customer. */
  metadata?: MetaDataT | null;
  /** Risk action to take. */
  risk_action?: RiskActionOptionT | null;
  /** Customer's phone number in international format. */
  international_format?: string | null;
};

/**
 * Represents a history event.
 */
type HistoryT = {
  /** Type of history event. */
  type: HistoryTypeOptionT;
  /** Message describing the event. */
  message: string;
  /** Timestamp of the event. */
  time: number;
};

/**
 * Represents transaction logs.
 */
type LogT = {
  /** Start time of the transaction. */
  start_time: number;
  /** Time spent processing the transaction. */
  time_spent: number;
  /** Number of attempts made. */
  attempts: number;
  /** Number of errors encountered. */
  errors: number;
  /** Whether the transaction was successful. */
  success: boolean;
  /** Whether the transaction was initiated from a mobile device. */
  mobile: boolean;
  /** Transaction input data. */
  input: [];
  /** History of events for the transaction. */
  history: HistoryT[];
};

/**
 * Represents transaction volume by currency.
 */
type VolumeByCurrencyT = {
  /** Currency code. */
  currency: CurrencyOptionT;
  /** Amount in the lowest denomination (e.g., NGN kobo). */
  amount: number;
};

/**
 * Parameters for initializing a transaction.
 */
export type TransactionInitializeBodyParamsT = {
  /** Transaction amount in the lowest denomination (e.g., NGN kobo). */
  amount: string;
  /** Customer's email address. */
  email: string;
  /** Currency code. */
  currency?: CurrencyOptionT;
  /** Unique alphanumeric reference for the transaction. */
  reference?: string;
  /** Callback URL to redirect to after payment. */
  callback_url?: string;
  /** Plan code to convert the transaction to a subscription. */
  plan?: string;
  /** Number of times to charge the customer for a subscription. */
  invoice_limit?: number;
  /** Stringified JSON metadata. */
  metadata?: string;
  /** Payment channels to be available. */
  channels?: PaymentChannelOptionT[];
  /** Split code for transaction splitting. */
  split_code?: string;
  /** Subaccount code that owns the payment. */
  subaccount?: string;
  /** Transaction charge to override split config. */
  transaction_charge?: number;
  /** Who bears the charges (account or subaccount). Defaults to account. */
  bearer?: string;
};

/**
 * Parameters for charging an authorization.
 */
export type TransactionChargeAuthorizationBodyParamsT = {
  /** Amount to charge in the lowest denomination (e.g., NGN kobo). */
  amount: string;
  /** Customer's email address. */
  email: string;
  /** Authorization code. */
  authorization_code: string;
  /** Unique alphanumeric reference. */
  reference?: string;
  /** Currency code. */
  currency?: CurrencyOptionT;
  /** Stringified JSON metadata. */
  metadata?: string;
  /** Payment channels to display to the user. */
  channel?: PaymentChannelOptionT[];
  /** Subaccount code that owns the payment. */
  subaccount?: string;
  /** Flat fee to charge the subaccount. */
  transaction_charge?: number;
  /** Who bears Paystack charges (account or subaccount). */
  bearer?: BearerOptionT;
  /** Queue the transaction for scheduled charging. */
  queue?: boolean;
};

/**
 * Parameters for partially debiting a transaction.
 */
export type TransactionPartialDebitBodyParamsT = {
  /** Authorization code. */
  authorization_code: string;
  /** Currency code. */
  currency: CurrencyOptionT;
  /** Amount to debit in the lowest denomination (e.g., NGN kobo). */
  amount: string;
  /** Customer's email address. */
  email: string;
  /** Unique alphanumeric reference. */
  reference?: string;
  /** Minimum amount to charge. */
  at_least?: string;
};

/**
 * Query parameters for listing transactions.
 */
export type TransactionListQueryParamsT = {
  /** Customer ID. */
  customer?: number;
  /** Terminal ID. */
  terminalid?: string;
  /** Transaction status. */
  status?: StatusOptionT;
  /** Transaction amount in the lowest denomination (e.g., NGN kobo). */
  amount?: number;
} & ListQueryParamsT;

/**
 * Parameters for exporting transactions.
 */
export type TransactionExportParamsT = {
  /** Customer ID. */
  customer?: number;
  /** Transaction status. */
  status?: StatusOptionT;
  /** Transaction currency. */
  currency?: CurrencyOptionT;
  /** Transaction amount in the lowest denomination (e.g., NGN kobo). */
  amount?: number;
  /** Whether to export settled transactions only. */
  settled?: boolean;
  /** Settlement ID. */
  settlement?: number;
  /** Payment page ID. */
  payment_page?: number;
} & ListQueryParamsT;

/**
 * Query parameters for getting transaction totals.
 */
export type TransactionTotalsQueryParamsT = ListQueryParamsT;

/**
 * Response data for initializing a transaction.
 */
export type TransactionInitializeResponseDataT = {
  /** Authorization URL. */
  authorization_url: string;
  /** Access code. */
  access_code: string;
  /** Transaction reference. */
  reference: string;
};

/**
 * Response data for a transaction.
 */
export type TransactionResponseDataT = {
  /** Transaction ID. */
  id?: number | null;
  /** Domain. */
  domain?: DomainOptionT | null;
  /** Transaction status. */
  status?: StatusOptionT | null;
  /** Transaction reference. */
  reference?: string | null;
  /** Transaction amount. */
  amount?: number | null;
  /** Transaction message. */
  message?: string | null;
  /** Gateway response. */
  gateway_response?: GatewayResponseOptionT | null;
  /** Time of payment. */
  paid_at?: string | null;
  /** Transaction creation time. */
  created_at?: string | null;
  /** Payment channel. */
  channel?: PaymentChannelOptionT | null;
  /** Currency code. */
  currency?: CurrencyOptionT | null;
  /** IP address. */
  ip_address?: string | null;
  /** Metadata. */
  metadata?: MetaDataT | null;
  /** Transaction logs. */
  log?: LogT | null;
  /** Transaction fees. */
  fees?: number | null;
  /** Time of payment. */
  paidAt?: string | null;
  /** Authorization details. */
  authorization?: AuthorizationT | null;
  /** Fees split. */
  fees_split?: unknown | null;
  /** Customer details. */
  customer?: CustomerT | null;
  /** Plan details. */
  plan?: unknown | null;
  /** Transaction split details. */
  split?: object | null;
  /** Order ID. */
  order_id?: unknown | null;
  /** Transaction creation time. */
  createdAt?: string | null;
  /** Requested amount. */
  requested_amount?: number | null;
  /** POS transaction data. */
  pos_transaction_data?: unknown | null;
  /** Transaction source. */
  source?: unknown | null;
  /** Fees breakdown. */
  fees_breakdown?: unknown | null;
  /** Transaction date. */
  transaction_date?: string | null;
  /** Plan object. */
  plan_object?: object | null;
  /** Subaccount details. */
  subaccount?: object | null;
  /** Transaction timeline. */
  timeline?: unknown | null;
};

/**
 * Response data for transaction timeline.
 */
export type TransactionTimelineResponseDataT = {
  /** Time spent processing the transaction. */
  time_spent: number;
  /** Number of attempts made. */
  attempts: number;
  /** Authentication details. */
  authentication: null;
  /** Number of errors encountered. */
  errors: number;
  /** Whether the transaction was successful. */
  success: boolean;
  /** Whether the transaction was initiated from a mobile device. */
  mobile: boolean;
  /** Transaction input data. */
  input: unknown[];
  /** Payment channel. */
  channel: PaymentChannelOptionT;
  /** History of events for the transaction. */
  history: HistoryT[];
};

/**
 * Response data for transaction totals.
 */
export type TransactionTotalsResponseDataT = {
  /** Total number of transactions. */
  total_transactions: number;
  /** Number of unique customers. */
  unique_customers: number;
  /** Total transaction volume. */
  total_volume: number;
  /** Total volume by currency. */
  total_volume_by_currency: VolumeByCurrencyT[];
  /** Number of pending transfers. */
  pending_transfers: number;
  /** Pending transfers by currency. */
  pending_transfers_by_currency: VolumeByCurrencyT[];
};

/**
 * Response data for exporting transactions.
 */
export type TransactionExportResponseDataT = Record<"path", string>;
