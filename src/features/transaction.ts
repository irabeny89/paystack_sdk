import axios, { AxiosInstance } from "axios";
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
import { ResponseDataT, PaginatedResponseT, OptionT } from "../types/global";
import {
	TransactionInitializeBodyParamsT,
	TransactionInitializeResponseDataT,
	TransactionResponseDataT,
	TransactionListQueryParamsT,
	TransactionChargeAuthorizationBodyParamsT,
	TransactionTimelineResponseDataT,
	TransactionTotalsQueryParamsT,
	TransactionExportParamsT,
	TransactionPartialDebitBodyParamsT,
	TransactionTotalsResponseDataT,
	TransactionExportResponseDataT,
} from "../types/transaction_types";
import logger from "../logger";

let _logger: null | typeof logger;

/**
 * The transactions API allows you to create and manage payments on your integration.
 *
 * @export Transaction
 * @class Transaction
 */
export class Transaction {
	/**
	 * Axios instance preconfigured with secret to query the Paystack API directly.
	 *
	 * @type {AxiosInstance}
	 * @memberof Transaction
	 */
	axiosPaystackClient: AxiosInstance;

	constructor(paystackSecret: string, option?: OptionT) {
		_logger?.info("Transaction.constructor: checking and setting log level");
		if (option?.logLevel) {
			logger.level = option.logLevel;
			_logger = logger;
		}
		_logger?.info(
			"Transaction.constructor: current set log level",
			option?.logLevel
		);

		_logger?.info(
			"Transaction.constructor: creating Axios instance with Paystack secret and base url (%s) in header",
			PAYSTACK_BASE_URL
		);
		this.axiosPaystackClient = axios.create({
			headers: { Authorization: `Bearer ${paystackSecret}` },
			baseURL: PAYSTACK_BASE_URL,
		});
		_logger?.info(
			"Transaction.constructor: Axios instance created with secret and base url in header"
		);
	}

	/**
	 * Initialize a payment process and return data with authorization url for customer to complete payment, reference field to verify the payment on the backend later among other fields.
	 *
	 * ! `amount` should be in sub unit eg `amount / 100` where `amount` is in main unit eg 1 naira.
	 *
	 * ! Do not use the `reference` to verify on the frontend so as to not expose your Paystack secret.
	 *
	 * * There are utility functions to handle `amount` conversions eg the named exports `convertToSubUnit` and `convertToMainUnit`.
	 *
	 * @param {TransactionInitializeBodyParamsT} body request body.
	 * @return data with reference field
	 * @memberof Transaction
	 */
	initialize(body: TransactionInitializeBodyParamsT) {
		_logger?.info(
			"transaction.initialize: returning promise to initialize transaction"
		);
		_logger?.warn(
			"transaction.initialize: handle error for returned promised response"
		);
		return this.axiosPaystackClient.post<
			ResponseDataT<TransactionInitializeResponseDataT>
		>(TRANSACTION_INITIALIZE_PATH, body);
	}

	/**
	 * Confirms the status of a transaction. Alternative is the `webhook` API on your backend that you register with Paystack on admin console where you listen for the `charge.success` event before giving value.
	 *
	 * ! Response `amount` is in sub unit eg 100 for 1 naira.
	 *
	 * @param {string} reference - a reference to an initialized/processed transaction
	 * @return {*} a response object
	 * @memberof Transaction
	 */
	verify(reference: string) {
		_logger?.info(
			"transaction.verify: returning promise to verify reference %s",
			reference
		);
		_logger?.warn(
			"transaction.verify: handle error for returned promised response"
		);
		return this.axiosPaystackClient?.get<
			ResponseDataT<TransactionResponseDataT>
		>(TRANSACTION_VERIFY_PATH + reference);
	}

	/**
	 * List transactions carried out on your integration.
	 *
	 * ! `amount` should be in sub unit eg `amount / 100` where `amount` is in main unit eg 1 naira.
	 *
	 * ! Response `amount` is in sub unit eg 100 for 1 naira.
	 *
	 * ! If using `from` and `to` then value should be timestamps eg `2023-04-24T13:29:03.264Z` or `2023-04-24`
	 *
	 * * `perPage` and `page` has value `50` and `1` respectively.
	 *
	 * * There are utility functions to handle `amount` conversions eg the named exports `convertToSubUnit` and `convertToMainUnit`.
	 *
	 * @param {TransactionListQueryParamsT} [params] query parameters where defaults are - `perPage 50`, `page 1`
	 * @return {*}  list of transactions
	 * @memberof Transaction
	 */
	list(params?: TransactionListQueryParamsT) {
		_logger?.info(
			"transaction.list: returning promise to get transaction list"
		);
		_logger?.warn(
			"transaction.list: handle error for returned promised response"
		);
		return this.axiosPaystackClient?.get<
			PaginatedResponseT<TransactionResponseDataT>
		>(TRANSACTION_LIST_PATH, { params });
	}

	/**
	 * Get details of a transaction carried out on your integration.
	 *
	 * ! Response `amount` is in sub unit eg 100 for 1 naira.
	 *
	 * @param {string} transactionId id of transaction data to fetch
	 * @returns a transaction data
	 * @memberof Transaction
	 */
	fetchOne(transactionId: string) {
		_logger?.info(
			"transaction.fetchOne: returning promise to get a transaction: transactionId %s",
			transactionId
		);
		_logger?.warn(
			"transaction.fetchOne: handle error for returned promised response"
		);
		return this.axiosPaystackClient?.get<
			ResponseDataT<TransactionResponseDataT>
		>(`${TRANSACTION_LIST_PATH}/${transactionId}`);
	}

	/**
	 * All authorizations marked as reusable can be charged with this method whenever you need to receive payment without the sender entering their card details again.
	 *
	 * ! `amount` should be in sub unit eg `amount / 100` where `amount` is in main unit eg 1 naira.
	 *
	 * ! Response `amount` is in sub unit eg 100 for 1 naira.
	 *
	 * * There are utility functions to handle `amount` conversions eg the named exports `convertToSubUnit` and `convertToMainUnit`.
	 *
	 * @param {TransactionChargeAuthorizationBodyParamsT} requestBody amount, email and authorization code are required
	 * @return {*}  transaction response data
	 * @memberof Transaction
	 */
	chargeAuthorization(requestBody: TransactionChargeAuthorizationBodyParamsT) {
		_logger?.info(
			"transaction.chargeAuthorization: returning promise to charge with customer authorization"
		);
		_logger?.warn(
			"transaction.chargeAuthorization: handle error for returned promised response"
		);
		return this.axiosPaystackClient?.post<
			ResponseDataT<TransactionResponseDataT>
		>(TRANSACTION_CHARGE_AUTHORIZATION_PATH, requestBody);
	}

	/**
	 * View the timeline of a transaction.
	 *
	 * @param {string} idOrReference id or reference of the transaction
	 * @return {*}  response data
	 * @memberof Transaction
	 */
	timeline(idOrReference: string) {
		_logger?.info(
			"transaction.timeline: returning promise to get transaction timeline with id or reference %s",
			idOrReference
		);
		_logger?.warn(
			"transaction.timeline: handle error for returned promised response"
		);
		return this.axiosPaystackClient?.get<
			ResponseDataT<TransactionTimelineResponseDataT[]>
		>(TRANSACTION_TIMELINE_PATH + idOrReference);
	}

	/**
	 * Total amount received on your account.
	 *
	 * ! `amount` should be in sub unit eg `amount / 100` where `amount` is in main unit eg 1 naira.
	 *
	 * ! Response `amount` is in sub unit eg 100 for 1 naira.
	 *
	 * * There are utility functions to handle `amount` conversions eg the named exports `convertToSubUnit` and `convertToMainUnit`.
	 *
	 * @param {TransactionTotalsQueryParamsT} [params] query parameters
	 * @return {*} response data
	 * @memberof Transaction
	 */
	totals(params?: TransactionTotalsQueryParamsT) {
		_logger?.info(
			"transaction.totals: returning promise to get total amount received on Paystack"
		);
		_logger?.warn(
			"transaction.totals: handle error for returned promised response"
		);
		return this.axiosPaystackClient?.get<
			ResponseDataT<TransactionTotalsResponseDataT>
		>(TRANSACTION_TOTALS_PATH, { params });
	}

	/**
	 * Export list of transactions carried out on your integration. Mostly a path to download as a Comma Separated Value (CSV) file.
	 *
	 * ! `amount` should be in sub unit eg `amount / 100` where `amount` is in main unit eg 1 naira.
	 *
	 * * There are utility functions to handle `amount` conversions eg the named exports `convertToSubUnit` and `convertToMainUnit`.
	 *
	 * @param {TransactionExportParamsT} [params] optional query parameters
	 * @return {*} response data
	 * @memberof Transaction
	 */
	export(params?: TransactionExportParamsT) {
		_logger?.info(
			"transaction.export: returning promise to get exported transactions"
		);
		_logger?.warn(
			"transaction.export: handle error for returned promised response"
		);
		return this.axiosPaystackClient?.get<
			ResponseDataT<TransactionExportResponseDataT>
		>(TRANSACTION_EXPORT_PATH, { params });
	}

	/**
	 * Debit customer partially.
	 *
	 * ! `amount` should be in sub unit eg `amount / 100` where `amount` is in main unit eg 1 naira.
	 *
	 * ! Response `amount` is in sub unit eg 100 for 1 naira.
	 *
	 * * There are utility functions to handle this conversion eg the named exports `convertToSubUnit` and `convertToMainUnit`.
	 *
	 * @param {TransactionPartialDebitBodyParamsT} requestBody request body
	 * @return {*}  transaction response
	 * @memberof Transaction
	 */
	partialDebit(requestBody: TransactionPartialDebitBodyParamsT) {
		_logger?.info(
			"transaction.partialDebit: returning promise to perform partial debit"
		);
		_logger?.warn(
			"transaction.partialDebit: handle error for returned promised response"
		);
		return this.axiosPaystackClient?.post<
			ResponseDataT<TransactionResponseDataT>
		>(TRANSACTION_PARTIAL_DEBIT_PATH, requestBody);
	}
}
