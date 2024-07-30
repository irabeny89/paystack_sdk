import axios, { type AxiosInstance } from "axios";
import type { Logger } from "pino";
import {
	PAYSTACK_BASE_URL,
	TRANSFER_FINALIZE_PATH,
	TRANSFER_INITIATE_BULK_PATH,
	TRANSFER_PATH,
} from "../../config";
import createLogger from "../logger";
import type { OptionT, ResponseDataT } from "../types/global";
import type {
	FinalizeBodyParamsT,
	InitializeBulkResponseDataT,
	InitiateBodyParamsT,
	InitiateBulkBodyParamsT,
	ListResponseDataT,
	ListTransferQueryParamsT,
	TransferResponseDataT,
	VerifyResponseDataT,
} from "../types/transfer_types";

/**
 * # [Paystack Transfer API](https://paystack.com/docs/api/transfer)
 * Send money to your customers.
 *
 * Status of transfer object returned will be pending if OTP is disabled. In the event that an OTP is required, status will read otp.
 *
 * ## Features To Do
 * - [x] Check and set log level.
 * - [x] Initiate Transfer
 * - [x] Finalize Transfer
 * - [x] Initiate Bulk Transfer
 * - [x] List Transfers
 * - [x] Fetch One Transfer
 * - [x] Verify Transfer
 *
 * * ## Info
 * * There are utility functions to handle `amount` conversions i.e `convertToSubUnit` and `convertToMainUnit`.
 * * `perPage` and `page` has default values `50` and `1` respectively.
 * * Log levels are: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`, `true`.
 *
 * * The log level will set to `trace` if `true` is passed or `info` otherwise. Passing `silent` disables logging.
 *
 * ## Note
 * ! Create a transfer recipient first because data from that will be used here.
 * ! Disable the transfer OTP requirement to use `initiateBulk` method.
 */
export class Transfer {
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
			this.logger = createLogger("Transfer");

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

	// #region initiate
	/**
	 * # [Initiate Transfer](https://paystack.com/docs/api/transfer/#initiate)
	 * Send money to your customers.
	 *
	 * Status of transfer object returned will be `pending` if OTP is disabled.
	 * In the event that an OTP is required, status will read `otp`.
	 *
	 * @param {InitiateBodyParamsT} body
	 * @return promised Axios response
	 */
	initiate(body: InitiateBodyParamsT) {
		this.logger?.info(
			body,
			"initiate => returning promise to initiate transfer",
		);
		this.logger?.warn("initiate => handle error for returned promise.");
		return this.axiosPaystackClient.post<ResponseDataT<TransferResponseDataT>>(
			TRANSFER_PATH,
			body,
		);
	}

	// #region finalize
	/**
	 * # [Finalize Transfer](https://paystack.com/docs/api/transfer/#finalize)
	 * Finalize an initiated transfer.
	 *
	 * @param {FinalizeBodyParamsT} body - request body
	 * @return promise Axios response
	 */
	finalize(body: FinalizeBodyParamsT) {
		this.logger?.info(
			body,
			"finalize => returning promise to finalize an initiated transfer.",
		);
		this.logger?.warn("finalize => handle error returned from promise.");
		return this.axiosPaystackClient.post<ResponseDataT<TransferResponseDataT>>(
			TRANSFER_FINALIZE_PATH,
			body,
		);
	}

	// #region initiate bulk
	/**
	 * # [Initiate Bulk Transfer](https://paystack.com/docs/api/transfer/#bulk)
	 * Batch multiple transfers in a single request.
	 *
	 * ! You need to disable the Transfers OTP requirement to use this endpoint.
	 *
	 * @param {InitiateBulkBodyParamsT} body - request data
	 * @return promised Axios response
	 */
	initiateBulk(body: InitiateBulkBodyParamsT) {
		this.logger?.info(
			body,
			"initiateBulk => returning promise to initiate bulk transfer.",
		);
		this.logger?.warn("initiateBulk => handle promise errors");
		return this.axiosPaystackClient.post<
			ResponseDataT<InitializeBulkResponseDataT>
		>(TRANSFER_INITIATE_BULK_PATH, body);
	}

	// #region list
	/**
	 * # [List Transfers](https://paystack.com/docs/api/transfer/#list)
	 * List the transfers made on your integration.
	 *
	 * @param params optional query parameters
	 * @returns promised Axios response
	 */
	list(params?: ListTransferQueryParamsT) {
		this.logger?.info(
			"list => returning promise to list transfers on the integration",
		);
		this.logger?.warn("list => handle promise errors");
		return this.axiosPaystackClient.get<ResponseDataT<ListResponseDataT>>(
			TRANSFER_PATH,
			{ params },
		);
	}

	// #region fetch
	/**
	 * # [Fetch A Transfer](https://paystack.com/docs/api/transfer/#fetch)
	 * Get details of a transfer on your integration.
	 * @param {string} idOrCode - transfer id or code
	 * @return promised Axios response
	 */
	fetch(idOrCode: string) {
		this.logger?.info("fetch => returning promise to fetch a transfer");
		this.logger?.warn("fetch => handle promise errors");
		return this.axiosPaystackClient.get<ResponseDataT<TransferResponseDataT>>(
			`${TRANSFER_PATH}/${idOrCode}`,
		);
	}

	// #region verify
	/**
	 * # [Verify Transfer](https://paystack.com/docs/api/transfer/#verify)
	 * Verify the status of a transfer on your integration.
	 * @param reference transfer reference
	 * @returns promised Axios response
	 */
	verify(reference: string) {
		this.logger?.info(
			"verify => returning promise to verify a transfer",
			reference,
		);
		this.logger?.warn("verify => handle promise errors");
		return this.axiosPaystackClient.get<ResponseDataT<VerifyResponseDataT>>(
			`${TRANSFER_PATH}/verify/${reference}`,
		);
	}
}
