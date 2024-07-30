import axios, { type AxiosInstance } from "axios";
import type { Logger } from "pino";
import {
	PAYSTACK_BASE_URL,
	TRANSACTION_CHARGE_AUTHORIZATION_PATH,
	TRANSACTION_EXPORT_PATH,
	TRANSACTION_INITIALIZE_PATH,
	TRANSACTION_LIST_PATH,
	TRANSACTION_PARTIAL_DEBIT_PATH,
	TRANSACTION_TIMELINE_PATH,
	TRANSACTION_TOTALS_PATH,
	TRANSACTION_VERIFY_PATH,
} from "../../config";
import createLogger from "../logger";
import type {
	OptionT,
	PaginatedResponseT,
	ResponseDataT,
} from "../types/global";
import type {
	TransactionChargeAuthorizationBodyParamsT,
	TransactionExportParamsT,
	TransactionExportResponseDataT,
	TransactionInitializeBodyParamsT,
	TransactionInitializeResponseDataT,
	TransactionListQueryParamsT,
	TransactionPartialDebitBodyParamsT,
	TransactionResponseDataT,
	TransactionTimelineResponseDataT,
	TransactionTotalsQueryParamsT,
	TransactionTotalsResponseDataT,
} from "../types/transaction_types";

/**
 * # [Paystack Transaction API](https://paystack.com/docs/api/transaction)
 * The transactions API allows you to create and manage payments on your integration.
 *
 * ## Features
 * - [x] check and set log level.
 * - [x] Axios client pre-configured to connect to Paystack.
 * - [x] Initialize transactions.
 * - [x] Verify transactions.
 * - [x] List transactions.
 * - [x] Fetch transaction.
 * - [x] Charge authorizations(auto charging without entering card details).
 * - [x] Timeline of transactions.
 * - [x] Total amount received.
 * - [x] Export transaction records (currently as CSV file).
 * - [x] Partial debiting of customers.
 *
 * ## Info
 * * There are utility functions to handle `amount` conversions i.e `convertToSubUnit` and `convertToMainUnit`.
 * * `perPage` and `page` has default values `50` and `1` respectively.
 * * Log levels are: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`, `true`.
 *
 * * The log level will set to `trace` if `true` is passed or `info` otherwise. Passing `silent` disables logging.
 *
 * ## Note
 * ! `amount` is in sub unit i.e N1, $1 e.t.c equals `100`.
 * ! Do not use the `reference` to verify on the frontend so as to not expose your Paystack secret.
 * ! If using `from` and `to` then value should be timestamps eg `2023-04-24T13:29:03.264Z` or `2023-04-24`.
 */
export class Transaction {
	/**
	 * Debug levels are: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`, `true`.
	 *
	 * This will stop at `trace` if set to `true` or `info` otherwise. Passing `silent` disables logging.
	 */
	readonly logLevel: OptionT["logLevel"];

	readonly logger: Logger<never> | undefined;
	/**
	 * Axios instance pre-configured with `secret` key to query the Paystack API.
	 */
	readonly axiosPaystackClient: AxiosInstance;

	// #region constructor
	constructor(paystackSecret: string, option?: OptionT) {
		if (option?.logLevel) {
			this.logger = createLogger("Transaction");

			this.logger?.info(
				"constructor => setting and adding log level (%s) -> logLevel",
				option.logLevel,
			);
			this.logger.level = this.logLevel = option.logLevel;
		}

		this.logger?.info(
			"constructor => adding custom Axios client -> axiosPaystackClient",
		);
		this.axiosPaystackClient = axios.create({
			headers: { Authorization: `Bearer ${paystackSecret}` },
			baseURL: PAYSTACK_BASE_URL,
		});
	}

	// #region initialize
	/**
	 * # [Initialize Transaction](https://paystack.com/docs/api/transaction/#initialize)
	 * Initialize a payment process and return data with authorization url for customer to complete payment, reference field to verify the payment on the backend later among other fields.
	 *
	 * @param {TransactionInitializeBodyParamsT} body request body.
	 * @return Axios response
	 */
	initialize(body: TransactionInitializeBodyParamsT) {
		this.logger?.info(
			"initialize => returning promise to initialize transaction",
		);
		this.logger?.warn(
			"initialize => handle error for returned promised response",
		);
		return this.axiosPaystackClient.post<
			ResponseDataT<TransactionInitializeResponseDataT>
		>(TRANSACTION_INITIALIZE_PATH, body);
	}

	// #region verify
	/**
	 * # [Verify Transaction](https://paystack.com/docs/api/transaction/#verify)
	 * Confirms the status of a transaction. Alternative is the `webhook` API on your backend that you register with Paystack on admin console where you listen for the `charge.success` event before giving value.
	 *
	 * @param {string} reference - a reference to an initialized/processed transaction
	 * @return Axios response
	 */
	verify(reference: string) {
		this.logger?.info(
			"verify => returning promise to verify reference %s",
			reference,
		);
		this.logger?.warn("verify => handle error for returned promised response");
		return this.axiosPaystackClient?.get<
			ResponseDataT<TransactionResponseDataT>
		>(TRANSACTION_VERIFY_PATH + reference);
	}

	// #region list
	/**
	 * # [List Transactions](https://paystack.com/docs/api/transaction/#list)
	 * List transactions carried out on your integration.
	 *
	 * @param {TransactionListQueryParamsT} [params] query parameters where defaults are - `perPage 50`, `page 1`
	 * @return Axios response
	 */
	list(params?: TransactionListQueryParamsT) {
		this.logger?.info("list => returning promise to get transaction list");
		this.logger?.warn("list => handle error for returned promised response");
		return this.axiosPaystackClient?.get<
			PaginatedResponseT<TransactionResponseDataT>
		>(TRANSACTION_LIST_PATH, { params });
	}

	// #region fetch
	/**
	 * # [Fetch Transaction](https://paystack.com/docs/api/transaction/#fetch)
	 * Get details of a transaction carried out on your integration.
	 *
	 * @param {string} transactionId id of transaction data to fetch
	 * @returns Axios response
	 */
	fetch(transactionId: string) {
		this.logger?.info(
			"fetch => returning promise to fetch a transaction: transactionId %s",
			transactionId,
		);
		this.logger?.warn("fetch => handle error for returned promised response");
		return this.axiosPaystackClient?.get<
			ResponseDataT<TransactionResponseDataT>
		>(`${TRANSACTION_LIST_PATH}/${transactionId}`);
	}

	// #region charge authorization
	/**
	 * # [Charge Authorization](https://paystack.com/docs/api/transaction/#charge-authorization)
	 * All authorizations marked as reusable can be charged with this method whenever you need to receive payment without the sender entering their card details again.
	 *
	 * @param {TransactionChargeAuthorizationBodyParamsT} requestBody amount, email and authorization code are required
	 * @return Axios response
	 */
	chargeAuthorization(requestBody: TransactionChargeAuthorizationBodyParamsT) {
		this.logger?.info(
			"chargeAuthorization => returning promise to charge with customer authorization",
		);
		this.logger?.warn(
			"chargeAuthorization => handle error for returned promised response",
		);
		return this.axiosPaystackClient?.post<
			ResponseDataT<TransactionResponseDataT>
		>(TRANSACTION_CHARGE_AUTHORIZATION_PATH, requestBody);
	}

	// #region timeline
	/**
	 * # [Timeline of Transaction](https://paystack.com/docs/api/transaction/#view-timeline)
	 * View the timeline of a transaction.
	 *
	 * @param {string} idOrReference id or reference of the transaction
	 * @return Axios response
	 */
	timeline(idOrReference: string) {
		this.logger?.info(
			"timeline => returning promise to get transaction timeline with id or reference %s",
			idOrReference,
		);
		this.logger?.warn(
			"timeline => handle error for returned promised response",
		);
		return this.axiosPaystackClient?.get<
			ResponseDataT<TransactionTimelineResponseDataT[]>
		>(TRANSACTION_TIMELINE_PATH + idOrReference);
	}

	// #region totals
	/**
	 * # [Total Amount Received](https://paystack.com/docs/api/transaction/#totals)
	 * Total amount received on your account.
	 *
	 * @param {TransactionTotalsQueryParamsT} [params] query parameters
	 * @return Axios response
	 */
	totals(params?: TransactionTotalsQueryParamsT) {
		this.logger?.info(
			"totals => returning promise to get total amount received on Paystack",
		);
		this.logger?.warn("totals => handle error for returned promised response");
		return this.axiosPaystackClient?.get<
			ResponseDataT<TransactionTotalsResponseDataT>
		>(TRANSACTION_TOTALS_PATH, { params });
	}

	// #region export
	/**
	 * # [Export Transaction Records](https://paystack.com/docs/api/transaction/#export)
	 * Export list of transaction records carried out on your integration. Mostly a path to download as a Comma Separated Value (CSV) file.
	 *
	 * @param {TransactionExportParamsT} [params] optional query parameters
	 * @return Axios response
	 */
	export(params?: TransactionExportParamsT) {
		this.logger?.info(
			"export => returning promise to get exported transactions",
		);
		this.logger?.warn("export => handle error for returned promised response");
		return this.axiosPaystackClient?.get<
			ResponseDataT<TransactionExportResponseDataT>
		>(TRANSACTION_EXPORT_PATH, { params });
	}

	// #region partial debit
	/**
	 * # [Partial Debit](https://paystack.com/docs/api/transaction/#partial-debit)
	 * Debit customer partially.
	 *
	 * @param {TransactionPartialDebitBodyParamsT} requestBody request body
	 * @return Axios response
	 */
	partialDebit(requestBody: TransactionPartialDebitBodyParamsT) {
		this.logger?.info(
			"partialDebit => returning promise to perform partial debit",
		);
		this.logger?.warn(
			"partialDebit => handle error for returned promised response",
		);
		return this.axiosPaystackClient?.post<
			ResponseDataT<TransactionResponseDataT>
		>(TRANSACTION_PARTIAL_DEBIT_PATH, requestBody);
	}
}
