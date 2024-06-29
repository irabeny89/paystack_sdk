import axios, { type AxiosInstance } from "axios";
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
import logger from "../logger";
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

let _logger: null | typeof logger;

/**
 * # [Paystack Transaction API](https://paystack.com/docs/api/transaction)
 * The transactions API allows you to create and manage payments on your integration.
 *
 * ## Note
 * ! `amount` is in sub unit i.e N1, $1 e.t.c equals `100`.
 * ! Do not use the `reference` to verify on the frontend so as to not expose your Paystack secret.
 * ! If using `from` and `to` then value should be timestamps eg `2023-04-24T13:29:03.264Z` or `2023-04-24`
 *
 * ## Info
 * * There are utility functions to handle `amount` conversions i.e `convertToSubUnit` and `convertToMainUnit`.
 * * `perPage` and `page` has default values `50` and `1` respectively.
 *
 * ## Features To Do
 * - [x] check and set log level.
 * - [x] Axios client preconfigured to connect to Paystack.
 * - [x] Initialize transactions.
 * - [x] Verify transactions.
 * - [x] List transactions.
 * - [x] Fetch transaction.
 * - [x] Charge authorizations(auto charging without entering card details).
 * - [x] Timeline of transactions.
 * - [x] Total amount received.
 * - [x] Export transaction records (currently as CSV file).
 * - [x] Partial debitting of customers.
 *
 * @export Transaction
 * @class Transaction
 */
export class Transaction {
	/**
	 * Debug levels are: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`, `true`.
	 *
	 * This will stop at `trace` if set to `true` or `info` otherwise. Passing `silent` disables logging.
	 *
	 * @type {OptionT["logLevel"]}
	 * @memberof Transaction
	 */
	logLevel: OptionT["logLevel"];
	/**
	 * Axios instance preconfigured with `secret` key to query the Paystack API.
	 *
	 * @type {AxiosInstance}
	 * @memberof Transaction
	 */
	axiosPaystackClient: AxiosInstance;

	constructor(paystackSecret: string, option?: OptionT) {
		if (option?.logLevel) {
			logger.level = this.logLevel = option.logLevel;
			_logger = logger; // store updated logger
		}

		_logger?.info(
			"Transaction.constructor: creating Axios instance with (%s)",
			PAYSTACK_BASE_URL,
		);
		this.axiosPaystackClient = axios.create({
			headers: { Authorization: `Bearer ${paystackSecret}` },
			baseURL: PAYSTACK_BASE_URL,
		});
		_logger?.info("Transaction.constructor: created Axios instance");
	}

	/**
	 * # [Initialize Transaction](https://paystack.com/docs/api/transaction/#initialize)
	 * Initialize a payment process and return data with authorization url for customer to complete payment, reference field to verify the payment on the backend later among other fields.
	 *
	 * @param {TransactionInitializeBodyParamsT} body request body.
	 * @return data with reference field
	 * @memberof Transaction
	 */
	initialize(body: TransactionInitializeBodyParamsT) {
		_logger?.info(
			"transaction.initialize: returning promise to initialize transaction",
		);
		_logger?.warn(
			"transaction.initialize: handle error for returned promised response",
		);
		return this.axiosPaystackClient.post<
			ResponseDataT<TransactionInitializeResponseDataT>
		>(TRANSACTION_INITIALIZE_PATH, body);
	}

	/**
	 * # [Verify Transaction](https://paystack.com/docs/api/transaction/#verify)
	 * Confirms the status of a transaction. Alternative is the `webhook` API on your backend that you register with Paystack on admin console where you listen for the `charge.success` event before giving value.
	 *
	 * @param {string} reference - a reference to an initialized/processed transaction
	 * @return {*} a response object
	 * @memberof Transaction
	 */
	verify(reference: string) {
		_logger?.info(
			"transaction.verify: returning promise to verify reference %s",
			reference,
		);
		_logger?.warn(
			"transaction.verify: handle error for returned promised response",
		);
		return this.axiosPaystackClient?.get<
			ResponseDataT<TransactionResponseDataT>
		>(TRANSACTION_VERIFY_PATH + reference);
	}

	/**
	 * # [List Transactions](https://paystack.com/docs/api/transaction/#list)
	 * List transactions carried out on your integration.
	 *
	 * @param {TransactionListQueryParamsT} [params] query parameters where defaults are - `perPage 50`, `page 1`
	 * @return {*}  list of transactions
	 * @memberof Transaction
	 */
	list(params?: TransactionListQueryParamsT) {
		_logger?.info(
			"transaction.list: returning promise to get transaction list",
		);
		_logger?.warn(
			"transaction.list: handle error for returned promised response",
		);
		return this.axiosPaystackClient?.get<
			PaginatedResponseT<TransactionResponseDataT>
		>(TRANSACTION_LIST_PATH, { params });
	}

	/**
	 * # [Fetch Transaction](https://paystack.com/docs/api/transaction/#fetch)
	 * Get details of a transaction carried out on your integration.
	 *
	 * @param {string} transactionId id of transaction data to fetch
	 * @returns a transaction data
	 * @memberof Transaction
	 */
	fetch(transactionId: string) {
		_logger?.info(
			"transaction.fetchOne: returning promise to get a transaction: transactionId %s",
			transactionId,
		);
		_logger?.warn(
			"transaction.fetchOne: handle error for returned promised response",
		);
		return this.axiosPaystackClient?.get<
			ResponseDataT<TransactionResponseDataT>
		>(`${TRANSACTION_LIST_PATH}/${transactionId}`);
	}

	/**
	 * # [Charge Authorization](https://paystack.com/docs/api/transaction/#charge-authorization)
	 * All authorizations marked as reusable can be charged with this method whenever you need to receive payment without the sender entering their card details again.
	 *
	 * @param {TransactionChargeAuthorizationBodyParamsT} requestBody amount, email and authorization code are required
	 * @return {*}  transaction response data
	 * @memberof Transaction
	 */
	chargeAuthorization(requestBody: TransactionChargeAuthorizationBodyParamsT) {
		_logger?.info(
			"transaction.chargeAuthorization: returning promise to charge with customer authorization",
		);
		_logger?.warn(
			"transaction.chargeAuthorization: handle error for returned promised response",
		);
		return this.axiosPaystackClient?.post<
			ResponseDataT<TransactionResponseDataT>
		>(TRANSACTION_CHARGE_AUTHORIZATION_PATH, requestBody);
	}

	/**
	 * # [Timeline of Transaction](https://paystack.com/docs/api/transaction/#view-timeline)
	 * View the timeline of a transaction.
	 *
	 * @param {string} idOrReference id or reference of the transaction
	 * @return {*}  response data
	 * @memberof Transaction
	 */
	timeline(idOrReference: string) {
		_logger?.info(
			"transaction.timeline: returning promise to get transaction timeline with id or reference %s",
			idOrReference,
		);
		_logger?.warn(
			"transaction.timeline: handle error for returned promised response",
		);
		return this.axiosPaystackClient?.get<
			ResponseDataT<TransactionTimelineResponseDataT[]>
		>(TRANSACTION_TIMELINE_PATH + idOrReference);
	}

	/**
	 * # [Total Amount Received](https://paystack.com/docs/api/transaction/#totals)
	 * Total amount received on your account.
	 *
	 * @param {TransactionTotalsQueryParamsT} [params] query parameters
	 * @return {*} response data
	 * @memberof Transaction
	 */
	totals(params?: TransactionTotalsQueryParamsT) {
		_logger?.info(
			"transaction.totals: returning promise to get total amount received on Paystack",
		);
		_logger?.warn(
			"transaction.totals: handle error for returned promised response",
		);
		return this.axiosPaystackClient?.get<
			ResponseDataT<TransactionTotalsResponseDataT>
		>(TRANSACTION_TOTALS_PATH, { params });
	}

	/**
	 * # [Export Transaction Records](https://paystack.com/docs/api/transaction/#export)
	 * Export list of transaction records carried out on your integration. Mostly a path to download as a Comma Separated Value (CSV) file.
	 *
	 * @param {TransactionExportParamsT} [params] optional query parameters
	 * @return {*} response data
	 * @memberof Transaction
	 */
	export(params?: TransactionExportParamsT) {
		_logger?.info(
			"transaction.export: returning promise to get exported transactions",
		);
		_logger?.warn(
			"transaction.export: handle error for returned promised response",
		);
		return this.axiosPaystackClient?.get<
			ResponseDataT<TransactionExportResponseDataT>
		>(TRANSACTION_EXPORT_PATH, { params });
	}

	/**
	 * # [Partial Debit](https://paystack.com/docs/api/transaction/#partial-debit)
	 * Debit customer partially.
	 *
	 * @param {TransactionPartialDebitBodyParamsT} requestBody request body
	 * @return {*}  transaction response
	 * @memberof Transaction
	 */
	partialDebit(requestBody: TransactionPartialDebitBodyParamsT) {
		_logger?.info(
			"transaction.partialDebit: returning promise to perform partial debit",
		);
		_logger?.warn(
			"transaction.partialDebit: handle error for returned promised response",
		);
		return this.axiosPaystackClient?.post<
			ResponseDataT<TransactionResponseDataT>
		>(TRANSACTION_PARTIAL_DEBIT_PATH, requestBody);
	}
}
