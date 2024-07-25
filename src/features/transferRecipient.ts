import axios, { AxiosInstance } from "axios";
import {
	PAYSTACK_BASE_URL,
	TRANSFER_RECIPIENT_PATH,
	TRANSFER_RECIPIENT_BULK_CREATE_PATH,
} from "../../config";
import {
	GetTransferRecipientBodyParamsT,
	TransferRecipientBulkCreateBodyParamsT,
	TransferRecipientBulkCreateResponseDataT,
	TransferRecipientResponseDataT,
} from "../types/transfer_recipient_types";
import {
	ListQueryParamsT,
	PaginatedResponseT,
	RecipientOptionT,
	ResponseDataT,
	StatusAndMessageT,
} from "../types/global";
import { OptionT } from "../types/global";
import createLogger from "../logger";
import { Logger } from "pino";

/**
 * # [Paystack Transfer Recipient API](https://paystack.com/docs/api/transfer-recipient)
 * The Transfer Recipients API allows you create and manage beneficiaries that you send money to.
 *
 * * ## Note
 * ! If using `from` and `to` then value should be timestamps eg `2023-04-24T13:29:03.264Z` or `2023-04-24`.
 * 
 * ## Info
 * * `perPage` and `page` has value `50` and `1` respectively.
 * 
 * ## Features To Do
 * - [x] Transfer recipient create
 * - [x] Transfer recipient bulk create
 * - [x] Transfer recipient list
 * - [x] Transfer recipient fetch one
 * - [x] Transfer recipient update
 */
export class TransferRecipient {
	// #region constructor
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

	constructor(paystackSecret: string, option?: OptionT) {
		if (option?.logLevel) {
			this.logger = createLogger("Transfer Recipient");

			this.logger?.info("constructor => setting and adding log level (%s) -> logLevel",	option.logLevel);
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

	// #region create
	/**
	 * # [Create Transfer Recipient](https://paystack.com/docs/api/transfer-recipient/#create)
	 * Creates a new recipient. A duplicate account number will lead to the retrieval of the existing record.
	 *
	 * @param {GetTransferRecipientBodyParamsT<T>} requestBody request body
	 * @return response data
	 */
	create<T extends RecipientOptionT>(
		requestBody: GetTransferRecipientBodyParamsT<T>
	) {
		this.logger?.info(
			"create => returning promise to create a transfer recipient"
		);
		this.logger?.warn(
			"create => handle error for this promised response"
		);
		return this.axiosPaystackClient.post<
			ResponseDataT<TransferRecipientResponseDataT>
		>(TRANSFER_RECIPIENT_PATH, requestBody);
	}

	// #region bulk create
	/**
	 * # [Bulk Create Transfer Recipient](https://paystack.com/docs/api/transfer-recipient/#bulk)
	 * Create multiple transfer recipient in batches.
	 * Duplicate account number will return the old one.
	 *
	 * @param {TransferRecipientBulkCreateBodyParamsT} requestBody request body
	 * @return response data
	 */
	bulkCreate(requestBody: TransferRecipientBulkCreateBodyParamsT) {
		this.logger?.info(
			"bulkCreate => returning promise to bulk create transfer recipient"
		);
		this.logger?.warn(
			"bulkCreate => handle error for returned promised response"
		);
		return this.axiosPaystackClient.post<
			ResponseDataT<TransferRecipientBulkCreateResponseDataT>
		>(TRANSFER_RECIPIENT_BULK_CREATE_PATH, requestBody);
	}

	// #region list
	/**
	 * # [List Transfer Recipients](https://paystack.com/docs/api/transfer-recipient/#list)
	 * List transfer recipients available on your integration.
	 *
	 * @param {ListQueryParamsT} [params] - query parameters
	 * @return paginated list
	 */
	list(params?: ListQueryParamsT) {
		this.logger?.info(
			"list => returning promise to list transfer recipients"
		);
		this.logger?.warn(
			"list => handle error for returned promised response"
		);

		return this.axiosPaystackClient.get<
			PaginatedResponseT<TransferRecipientResponseDataT>
		>(TRANSFER_RECIPIENT_PATH, { params });
	}

	// #region fetch
	/**
	 * # [Fetch Transfer Recipient](https://paystack.com/docs/api/transfer-recipient/#fetch)
	 * Fetch details of a transfer recipient.
	 *
	 * @param {string} idOrCode - id or code of the recipient
	 * @return transfer recipient response data
	 */
	fetch(idOrCode: string) {
		this.logger?.info(
			"fetch => returning promise to fetch one transfer recipient (parameter: %s)",
			idOrCode
		);
		this.logger?.warn(
			"fetch => handle error for returned promise"
		);
		return this.axiosPaystackClient.get<
			ResponseDataT<TransferRecipientResponseDataT>
		>(`${TRANSFER_RECIPIENT_PATH}/${idOrCode}`);
	}

	// #region update
	/**
	 * # [Update Transfer Recipient](https://paystack.com/docs/api/transfer-recipient/#update)
	 * Update a transfer recipient already available on your integration.
	 *
	 * @param {string} idOrCode - id or code of the transfer recipient
	 * @param {(Record<"name" | "email", string>)} update the new data to swap
	 * @return transfer recipient response data
	 */
	update(idOrCode: string, update: Record<"name" | "email", string>) {
		this.logger?.info(
			"update => returning promise to update a transfer recipient (parameter: %s",
			idOrCode
		);
		this.logger?.warn(
			"update => handle error for returned promise"
		);
		return this.axiosPaystackClient.put<
			ResponseDataT<TransferRecipientResponseDataT>
		>(`${TRANSFER_RECIPIENT_PATH}/${idOrCode}`, update);
	}

	// #region delete
	/**
	 * # [Delete Transfer Recipient](https://paystack.com/docs/api/transfer-recipient/#delete)
	 * Delete a transfer recipient by actually setting the transfer recipient to `inactive`.
	 *
	 * @param {string} idOrCode - id or code of the transfer recipient
	 * @return transfer recipient response data
	 */
	delete(idOrCode: string) {
		this.logger?.info(
			"delete => returning promise to delete a transfer recipient (parameter: %s",
			idOrCode
		);
		this.logger?.warn(
			"delete => handle error for returned promise"
		);
		return this.axiosPaystackClient.delete<StatusAndMessageT>(
			`${TRANSFER_RECIPIENT_PATH}/${idOrCode}`
		);
	}
}
