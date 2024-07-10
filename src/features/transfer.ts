import axios, { AxiosInstance } from "axios";
import { OptionT, ResponseDataT } from "../types/global";
import {
	PAYSTACK_BASE_URL,
	TRANSFER_FINALIZE_PATH,
	TRANSFER_INITIATE_BULK_PATH,
	TRANSFER_PATH,
} from "../../config";
import {
	FinalizeBodyParamsT,
	InitializeBulkResponseDataT,
	InitiateBodyParamsT,
	InitiateBulkBodyParamsT,
	ListResponseDataT,
	ListTransferQueryParamsT,
	TransferResponseDataT,
	VerifyResponseDataT,
} from "../types/transfer_types";
import { Logger } from "pino";
import createLogger from "../logger";

/**
 * # [Paystack Transfer API](https://paystack.com/docs/api/transfer)
 * Send money to your customers.
 * 
 * Status of transfer object returned will be pending if OTP is disabled. In the event that an OTP is required, status will read otp.
 *
 * ## Note
 * ! Create a transfer recipient first because data from that will be used here.   
 * ! Disable the transfer OTP requirement to use `initiateBulk` method.   
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
 * @export
 * @class Transfer
 */
export class Transfer {
	/**
	 * Debug levels are: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`, `true`.
	 *
	 * This will stop at `trace` if set to `true` or `info` otherwise. Passing `silent` disables logging.
	 *
	 * @type {OptionT["logLevel"]}
	 * @memberof Transaction
	 */
	readonly logLevel: OptionT["logLevel"];

	readonly logger: Logger<never> | undefined;
	/**
	 * Axios instance pre-configured with `secret` key to query the Paystack API.
	 *
	 * @type {AxiosInstance}
	 * @memberof Transaction
	 */
	readonly axiosPaystackClient: AxiosInstance;

	constructor(paystackSecret: string, option?: OptionT) {
		if (option?.logLevel) {
			this.logger = createLogger("transfer");

			this.logger.level = this.logLevel = option.logLevel;
		}

		this.logger?.info(
			"Transfer.constructor: current set log level",
			option?.logLevel
		);

		this.logger?.info(
			"Transfer.constructor: creating Axios instance with Paystack secret and base url (%s) in header",
			PAYSTACK_BASE_URL
		);
		this.axiosPaystackClient = axios.create({
			headers: { Authorization: `Bearer ${paystackSecret}` },
			baseURL: PAYSTACK_BASE_URL,
		});
		this.logger?.info(
			"Transfer.constructor: Axios instance created with secret and base url in header"
		);
	}

	/**
	 * # [Initiate Transfer](https://paystack.com/docs/api/transfer/#initiate)
	 * Send money to your customers.
	 *
	 * Status of transfer object returned will be `pending` if OTP is disabled.
	 * In the event that an OTP is required, status will read `otp`.
	 *
	 * @param {InitiateBodyParamsT} body
	 * @return promised response
	 * @memberof Transfer
	 */
	initiate(body: InitiateBodyParamsT) {
		this.logger?.info(
			body,
			"transfer.initiate: returning promise to initiate transfer"
		);
		this.logger?.warn("transfer.initiate: handle error for returned promise.");
		return this.axiosPaystackClient.post<ResponseDataT<TransferResponseDataT>>(
			TRANSFER_PATH,
			body
		);
	}

	/**
	 * # [Finalize Transfer](https://paystack.com/docs/api/transfer/#finalize)
	 * Finalize an initiated transfer.
	 *
	 * @param {FinalizeBodyParamsT} body - request body
	 * @return promised response data
	 * @memberof Transfer
	 */
	finalize(body: FinalizeBodyParamsT) {
		this.logger?.info(
			body,
			"transfer.finalize: returning promise to finalize an initiated transfer."
		);
		this.logger?.warn("transfer.finalize: handle error returned from promise.");
		return this.axiosPaystackClient.post<ResponseDataT<TransferResponseDataT>>(
			TRANSFER_FINALIZE_PATH,
			body
		);
	}

	/**
	 * # [Initiate Bulk Transfer](https://paystack.com/docs/api/transfer/#bulk)
	 * Batch multiple transfers in a single request.
	 *
	 * ! You need to disable the Transfers OTP requirement to use this endpoint.
	 *
	 * @param {InitiateBulkBodyParamsT} body - request data
	 * @return promised response data
	 * @memberof Transfer
	 */
	initiateBulk(body: InitiateBulkBodyParamsT) {
		this.logger?.info(
			body,
			"transfer.initiateBulk: returning promise to initiate bulk transfer."
		);
		this.logger?.warn("transfer.initiateBulk: handle promise errors");
		return this.axiosPaystackClient.post<
			ResponseDataT<InitializeBulkResponseDataT>
		>(TRANSFER_INITIATE_BULK_PATH, body);
	}

	/**
	 * # [List Transfers](https://paystack.com/docs/api/transfer/#list)
	 * List the transfers made on your integration.
	 *
	 * @param params optional query parameters
	 * @returns promised response
	 * @memberof Transfer
	 */
	list(params?: ListTransferQueryParamsT) {
		this.logger?.info(
			"transfer.list: returning promise to list transfers on the integration"
		);
		this.logger?.warn("transfer.list: handle promise errors");
		return this.axiosPaystackClient.get<ResponseDataT<ListResponseDataT>>(
			TRANSFER_PATH,
			{ params }
		);
	}

	/** 
	 * # [Fetch A Transfer](https://paystack.com/docs/api/transfer/#fetch)
	 * Get details of a transfer on your integration.
	 * @param {string} idOrCode - transfer id or code
	 * @return promised response
	 * @memberof Transfer
	 */
	fetch(idOrCode: string) {
		this.logger?.info("transfer.fetchOne: returning promise to fetch a transfer");
		this.logger?.warn("transfer.fetchOne: handle promise errors");
		return this.axiosPaystackClient.get<ResponseDataT<TransferResponseDataT>>(
			`${TRANSFER_PATH}/${idOrCode}`
		);
	}

	/**
	 * # [Verify A Transfer](https://paystack.com/docs/api/transfer/#verify)
	 * Verify the status of a transfer on your integration.
	 * @param reference transfer reference
	 * @returns promised response
	 */
	verify(reference: string) {
		this.logger?.info(
			"transfer.verify: returning promise to verify a transfer",
			reference
		);
		this.logger?.warn("transfer.verify: handle promise errors");
		return this.axiosPaystackClient.get<ResponseDataT<VerifyResponseDataT>>(
			`${TRANSFER_PATH}/verify/${reference}`
		);
	}
}
