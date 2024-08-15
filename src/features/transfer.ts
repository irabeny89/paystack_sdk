import type { Logger } from "pino";
import {
	TRANSFER_FINALIZE_PATH,
	TRANSFER_INITIATE_BULK_PATH,
	TRANSFER_PATH,
} from "../../config";
import createLogger from "../logger";
import type { ApiClientT, OptionT, ResponseDataT } from "../types/global";
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
import { createApiClient } from "../utils/api_client";

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
 *
 * @example
 * ```ts
 * 	const paystack = new Transfer("paystack-secret-key", { logLevel: "info" })
 * ```
 */
export class Transfer {
	/**
	 * Debug levels are: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`, `true`.
	 *
	 * This will stop at `trace` if set to `true` or `info` otherwise. Passing `silent` disables logging.
	 */
	readonly logLevel: OptionT["logLevel"];

	readonly logger: Logger<never> | undefined;

	/** pre-configured with Paystack secret and base url */
	readonly apiClient: ApiClientT;

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

		this.apiClient = createApiClient(paystackSecret);
	}

	// #region initiate
	/**
	 * # [Initiate Transfer](https://paystack.com/docs/api/transfer/#initiate)
	 * Send money to your customers.
	 *
	 * Status of transfer object returned will be `pending` if OTP is disabled.
	 * In the event that an OTP is required, status will read `otp`.
	 *
	 * @param body
	 * @return promise to initiate transfer
	 */
	initiate(
		body: InitiateBodyParamsT,
	): Promise<ResponseDataT<TransferResponseDataT>> {
		this.logger?.info(
			body,
			"initiate => returning promise to initiate transfer",
		);
		return this.apiClient.post<ResponseDataT<TransferResponseDataT>>(
			TRANSFER_PATH,
			body,
		);
	}

	// #region finalize
	/**
	 * # [Finalize Transfer](https://paystack.com/docs/api/transfer/#finalize)
	 * Finalize an initiated transfer.
	 *
	 * @param body request body
	 * @return promise to finalize transfer
	 */
	finalize(
		body: FinalizeBodyParamsT,
	): Promise<ResponseDataT<TransferResponseDataT>> {
		this.logger?.info(
			body,
			"finalize => returning promise to finalize an initiated transfer.",
		);
		return this.apiClient.post<ResponseDataT<TransferResponseDataT>>(
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
	 * @param body - request data
	 * @return promised to initiate bulk transfer
	 */
	initiateBulk(
		body: InitiateBulkBodyParamsT,
	): Promise<ResponseDataT<InitializeBulkResponseDataT>> {
		this.logger?.info(
			body,
			"initiateBulk => returning promise to initiate bulk transfer.",
		);
		return this.apiClient.post<ResponseDataT<InitializeBulkResponseDataT>>(
			TRANSFER_INITIATE_BULK_PATH,
			body,
		);
	}

	// #region list
	/**
	 * # [List Transfers](https://paystack.com/docs/api/transfer/#list)
	 * List the transfers made on your integration.
	 *
	 * @param params optional query parameters
	 * @returns promised to list transfers
	 */
	list(
		params?: ListTransferQueryParamsT,
	): Promise<ResponseDataT<ListResponseDataT>> {
		this.logger?.info(
			"list => returning promise to list transfers on the integration",
		);
		return this.apiClient.get<ResponseDataT<ListResponseDataT>>(
			TRANSFER_PATH,
			params,
		);
	}

	// #region fetch
	/**
	 * # [Fetch A Transfer](https://paystack.com/docs/api/transfer/#fetch)
	 * Get details of a transfer on your integration.
	 * @param idOrCode transfer id or code
	 * @return promise to fetch a transfer
	 */
	fetch(idOrCode: string): Promise<ResponseDataT<TransferResponseDataT>> {
		this.logger?.info("fetch => returning promise to fetch a transfer");
		return this.apiClient.get<ResponseDataT<TransferResponseDataT>>(
			`${TRANSFER_PATH}/${idOrCode}`,
		);
	}

	// #region verify
	/**
	 * # [Verify Transfer](https://paystack.com/docs/api/transfer/#verify)
	 * Verify the status of a transfer on your integration.
	 * @param reference transfer reference
	 * @returns promise to verify transfer
	 */
	verify(reference: string): Promise<ResponseDataT<VerifyResponseDataT>> {
		this.logger?.info(
			"verify => returning promise to verify a transfer",
			reference,
		);
		return this.apiClient.get<ResponseDataT<VerifyResponseDataT>>(
			`${TRANSFER_PATH}/verify/${reference}`,
		);
	}
}
