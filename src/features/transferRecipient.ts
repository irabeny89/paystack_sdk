import type pino from "pino";
import type { Logger } from "pino";
import {
	TRANSFER_RECIPIENT_BULK_CREATE_PATH,
	TRANSFER_RECIPIENT_PATH,
} from "../../config";
import createLogger from "../logger";
import type {
	ApiClientT,
	ListQueryParamsT,
	PaginatedResponseT,
	RecipientOptionT,
	ResponseDataT,
	StatusAndMessageT,
} from "../types/global";
import type { OptionT } from "../types/global";
import type {
	BulkCreateBodyParamsT,
	BulkCreateResponseDataT,
	CreateBodyParamsT,
	TransferRecipientResponseDataT,
} from "../types/transfer_recipient_types";
import { createApiClient } from "../utils/api_client";

/**
 * # [Paystack Transfer Recipient API](https://paystack.com/docs/api/transfer-recipient)
 * The Transfer Recipients API allows you create and manage beneficiaries that you send money to.
 *
 * ## Features
 * - [x] Transfer recipient create
 * - [x] Transfer recipient bulk create
 * - [x] Transfer recipient list
 * - [x] Transfer recipient fetch one
 * - [x] Transfer recipient update
 *
 * ## Info
 * * `perPage` and `page` has value `50` and `1` respectively.
 *
 * * ## Note
 * ! If using `from` and `to` then value should be timestamps eg `2023-04-24T13:29:03.264Z` or `2023-04-24`.
 *
 * @example
 * ```ts
 * 	const paystack = new TransferRecipient("paystack-secret-key", { logLevel: "info" })
 * ```
 */
export class TransferRecipient {
	/**
	 * Debug levels are: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`, `true`.
	 *
	 * This will stop at `trace` if set to `true` or `info` otherwise. Passing `silent` disables logging.
	 */
	readonly logLevel: pino.Level | "silent" | undefined;

	readonly logger: Logger<never> | undefined;
	/** pre-configured with Paystack secret and base url */
	readonly apiClient: ApiClientT;

	// #region constructor
	constructor(paystackSecret: string, option?: OptionT) {
		if (option?.logLevel) {
			this.logger = createLogger("Transfer Recipient");

			this.logger?.info(
				"constructor => setting and adding log level (%s) -> logLevel",
				option.logLevel,
			);
			this.logger.level = this.logLevel = option.logLevel;
		}

		this.apiClient = createApiClient(paystackSecret);
	}

	// #region create
	/**
	 * # [Create Transfer Recipient](https://paystack.com/docs/api/transfer-recipient/#create)
	 * Creates a new recipient. A duplicate account number will lead to the retrieval of the existing record.
	 *
	 * @param requestBody request body
	 * @return promise to create transfer recipient
	 */
	create<T extends RecipientOptionT>(
		requestBody: CreateBodyParamsT<T>,
	): Promise<ResponseDataT<TransferRecipientResponseDataT>> {
		this.logger?.info(
			"create => returning promise to create a transfer recipient",
		);
		return this.apiClient.post<ResponseDataT<TransferRecipientResponseDataT>>(
			TRANSFER_RECIPIENT_PATH,
			requestBody,
		);
	}

	// #region bulk create
	/**
	 * # [Bulk Create Transfer Recipient](https://paystack.com/docs/api/transfer-recipient/#bulk)
	 * Create multiple transfer recipient in batches.
	 * Duplicate account number will return the old one.
	 *
	 * @param requestBody request body
	 * @return promise to bulk create transfer recipient
	 */
	bulkCreate(
		requestBody: BulkCreateBodyParamsT,
	): Promise<ResponseDataT<BulkCreateResponseDataT>> {
		this.logger?.info(
			"bulkCreate => returning promise to bulk create transfer recipient",
		);
		return this.apiClient.post<ResponseDataT<BulkCreateResponseDataT>>(
			TRANSFER_RECIPIENT_BULK_CREATE_PATH,
			requestBody,
		);
	}

	// #region list
	/**
	 * # [List Transfer Recipients](https://paystack.com/docs/api/transfer-recipient/#list)
	 * List transfer recipients available on your integration.
	 *
	 * @param query query parameters
	 * @return promise to list transfer recipient
	 */
	list(
		query?: ListQueryParamsT,
	): Promise<PaginatedResponseT<TransferRecipientResponseDataT>> {
		this.logger?.info("list => returning promise to list transfer recipients");
		return this.apiClient.get<
			PaginatedResponseT<TransferRecipientResponseDataT>
		>(TRANSFER_RECIPIENT_PATH, query);
	}

	// #region fetch
	/**
	 * # [Fetch Transfer Recipient](https://paystack.com/docs/api/transfer-recipient/#fetch)
	 * Fetch details of a transfer recipient.
	 *
	 * @param idOrCode id or code of the recipient
	 * @return promise to fetch transfer recipient
	 */
	fetch(
		idOrCode: string,
	): Promise<ResponseDataT<TransferRecipientResponseDataT>> {
		this.logger?.info(
			"fetch => returning promise to fetch one transfer recipient (parameter: %s)",
			idOrCode,
		);
		return this.apiClient.get<ResponseDataT<TransferRecipientResponseDataT>>(
			`${TRANSFER_RECIPIENT_PATH}/${idOrCode}`,
		);
	}

	// #region update
	/**
	 * # [Update Transfer Recipient](https://paystack.com/docs/api/transfer-recipient/#update)
	 * Update a transfer recipient already available on your integration.
	 *
	 * @param idOrCode id or code of the transfer recipient
	 * @param update the new data to swap
	 * @return promise to update transfer recipient
	 */
	update(
		idOrCode: string,
		update: Record<"name" | "email", string>,
	): Promise<ResponseDataT<TransferRecipientResponseDataT>> {
		this.logger?.info(
			"update => returning promise to update a transfer recipient - %s",
			idOrCode,
		);
		return this.apiClient.put<ResponseDataT<TransferRecipientResponseDataT>>(
			`${TRANSFER_RECIPIENT_PATH}/${idOrCode}`,
			update,
		);
	}

	// #region delete
	/**
	 * # [Delete Transfer Recipient](https://paystack.com/docs/api/transfer-recipient/#delete)
	 * Delete a transfer recipient by actually setting the transfer recipient to `inactive`.
	 *
	 * @param idOrCode - id or code of the transfer recipient
	 * @return transfer recipient response data
	 */
	delete(idOrCode: string): Promise<StatusAndMessageT> {
		this.logger?.info(
			"delete => returning promise to delete a transfer recipient (parameter: %s",
			idOrCode,
		);
		return this.apiClient.delete<StatusAndMessageT>(
			`${TRANSFER_RECIPIENT_PATH}/${idOrCode}`,
		);
	}
}
