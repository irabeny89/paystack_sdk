import type { Level } from "pino";

/**
 * Has a required version field
 */
export type HasRequiredFieldT = {
  /**
   * Version of the object
   */
  version: string;
};

/**
 * Json data type option
 */
export type JsonDataTypeOptionT = string | number | boolean;

/**
 * Id and timestamps
 */
export type IdAndTimestampsT = {
  /**
   * Id of the object
   */
  id: number;
  /**
   * ISO Date string eg 2017-02-03T17:21:54.508Z
   */
  createdAt: string;
  /**
   * ISO Date string eg 2017-02-03T17:21:54.508Z
   */
  updatedAt: string;
};

/**
 * Status and message
 */
export type StatusAndMessageT = {
  /**
   * Status of the operation
   */
  status: boolean;
  /**
   * Message of the operation
   */
  message: string;
};

/**
 * Response data
 */
export type ResponseDataT<T> = {
  /**
   * Data of the response
   */
  data: T;
} & StatusAndMessageT;

/**
 * Paginated response meta
 */
type PaginatedResponseMetaT = {
  /**
   * Total number of items
   */
  total?: number;
  /**
   * Number of items skipped
   */
  skipped?: number;
  /**
   * Current page number
   */
  page?: number;
  /**
   * Total number of pages
   */
  pageCount?: number;
  /**
   * Next page number
   */
  next?: number;
  /**
   * Previous page number
   */
  previous?: number;
  /**
   * Number of items per page
   */
  perPage?: number;
};

/**
 * Paginated response
 */
export type PaginatedResponseT<T> = {
  /**
   * Metadata of the response
   */
  meta?: PaginatedResponseMetaT;
  /**
   * Data of the response
   */
  data: T[];
} & StatusAndMessageT;

/**
 * Metadata custom field
 */
export type MetaDataCustomFieldT = {
  /**
   * Display name of the custom field
   */
  display_name: string;
  /**
   * Variable name of the custom field
   */
  variable_name: string;
  /**
   * Value of the custom field
   */
  value: JsonDataTypeOptionT;
};

/**
 * Metadata custom filter
 */
export type MetaDataCustomFilterT = {
  /**
   * Whether the filter is recurring
   */
  recurring: boolean;
  /**
   * Banks
   */
  banks: string[];
  /**
   * Card brands
   */
  card_brands: CardBrandOptionT[];
};

/**
 * User defined metadata fields
 */
export type UserDefinedMetaDataFieldsT = { [k: string]: JsonDataTypeOptionT };

/**
 * Metadata
 */
export type MetaDataT = Partial<
  UserDefinedMetaDataFieldsT & {
    /**
     * Custom fields
     */
    custom_fields: MetaDataCustomFieldT[];
    /**
     * Cancel action
     */
    cancel_action: string;
  }
>;

/**
 * List query parameters
 */
export type ListQueryParamsT = {
  /**
   * Number of items per page, default: 50
   */
  perPage?: number;
  /**
   * Page number, default: 1
   */
  page?: number;
  /**
   * From date, eg 2023-04-01T16:10:02.355Z or 2023-04-01
   */
  from?: string;
  /**
   * To date, eg 2023-04-01T16:10:02.355Z or 2023-04-01
   */
  to?: string;
};

/**
 * Currency options
 */
export type CurrencyOptionT = "NGN" | "GHS" | "ZAR" | "USD";

/**
 * Country options
 */
export type CountryOptionT = "nigeria" | "ghana" | "kenya" | "south africa";

/**
 * Card brand options
 */
export type CardBrandOptionT = "visa" | "verve" | "mastercard";

/**
 * Payment channel options
 */
export type PaymentChannelOptionT = "card" | "bank" | "ussd" | "qr";

/**
 * Domain options
 */
export type DomainOptionT = "test" | "live";

/**
 * Gateway options
 */
export type GatewayOptionT = "emandate" | "digitalbankmandate";

/**
 * Gateway response options
 */
export type GatewayResponseOptionT = "declined" | "successful";

/**
 * Risk action options
 */
export type RiskActionOptionT = "default" | "deny";

/**
 * Recipient options
 */
export type RecipientOptionT = "nuban" | "basa" | "mobile_money";

/**
 * Interval options
 */
export type IntervalOptionT =
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "biannually"
  | "annually";

/**
 * Options
 */
export type OptionT = {
  /**
   * Log level
   * Debug levels are:
   * 1:`fatal`
   * 2:`error`
   * 3:`warn`
   * 4:`info`
   * 5:`debug`
   * 6:`trace`
   * 7:`silent`.
   * This will stop at `trace` if set to `true` or `info` otherwise. Passing `silent` disables logging.
   */
  logLevel?: Level | "silent";
};

/**
 * Authorization
 */
export type AuthorizationT = {
  /**
   * Authorization code
   */
  authorization_code?: string | null;
  /**
   * Bin
   */
  bin?: string | null;
  /**
   * Last 4 digits of the card number
   */
  last4?: string | null;
  /**
   * Expiration month
   */
  exp_month?: string | null;
  /**
   * Expiration year
   */
  exp_year?: string | null;
  /**
   * Payment channel
   */
  channel?: PaymentChannelOptionT | null;
  /**
   * Card type
   */
  card_type?: CardBrandOptionT | null;
  /**
   * Bank
   */
  bank?: string | null;
  /**
   * Account name
   */
  account_name?: string | null;
  /**
   * Country code
   */
  country_code?: string | null;
  /**
   * Brand
   */
  brand?: PaymentChannelOptionT | null;
  /**
   * Reusable
   */
  reusable?: boolean | null;
  /**
   * Signature
   */
  signature?: string | null;
};

/**
 * Query parameters
 */
export type QueryT = {
  [k: string]: string | number | boolean;
};

/**
 * API client
 */
export type ApiClientT = {
  /**
   * GET request
   */
  get: <R = unknown>(path: string, query?: QueryT) => Promise<R>;
  /**
   * POST request
   */
  post: <R = unknown, B = unknown>(path: string, body: B) => Promise<R>;
  /**
   * PUT request
   */
  put: <R = unknown, B = unknown>(path: string, body: B) => Promise<R>;
  /**
   * DELETE request
   */
  delete: <R = unknown, B = unknown>(path: string) => Promise<R>;
};
