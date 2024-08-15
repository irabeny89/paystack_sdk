import type pino from "pino";
import type { Logger } from "pino";
import {
	VERIFICATION_CARD_BIN,
	VERIFICATION_RESOLVE_PATH,
	VERIFICATION_VALIDATE_PATH,
} from "../../config";
import createLogger from "../logger";
import type { ApiClientT, OptionT, ResponseDataT } from "../types/global";
import type {
	ResolveAccountQueryParamsT,
	ResolveAccountResponseDataT,
	ResolveCardBinResponseDataT,
	ValidateAccountBodyParamsT,
} from "../types/verification_types";
import { createApiClient } from "../utils/api_client";

/**
 * # [Verification](https://paystack.com/docs/api/verification/#verification)
 * The Verification API allows you perform KYC processes.
 *
 * ## Features
 * - [x] Resolve account number
 * - [x] Validate account
 * - [x] Resolve Card BIN
 *
 * @example
 * ```ts
 * 	const verification = new Verification("paystack-secret-key", { logLevel: "info" })
 * ```
 */
export class Verification {
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

	// #region resolve account
	/**
	 * ## [Resolve Account](https://paystack.com/docs/api/verification/#resolve-account)
	 * Confirm an account belongs to the right customer.
	 *
	 * @param query query parameters
	 * @return promise to resolve account number
	 */
	resolveAccount(
		query: ResolveAccountQueryParamsT,
	): Promise<ResponseDataT<ResolveAccountResponseDataT>> {
		this.logger?.info(
			"resolveAccount => returning promise to resolve account number %s",
			JSON.stringify(query),
		);
		return this.apiClient.get<ResponseDataT<ResolveAccountResponseDataT>>(
			VERIFICATION_RESOLVE_PATH,
			query,
		);
	}

	// #region validate account
	/**
	 * ## [Validate Account](https://paystack.com/docs/api/verification/#validate-account)
	 * Confirm the authenticity of a customer's account number before sending money.
	 *
	 * @param requestBody request body
	 * @return promise to validate account number
	 */
	validateAccount(
		requestBody: ValidateAccountBodyParamsT,
	): Promise<ResponseDataT<ValidateAccountBodyParamsT>> {
		this.logger?.info(
			"validateAccount => returning promise to validate account number",
		);
		return this.apiClient.post<ResponseDataT<ValidateAccountBodyParamsT>>(
			VERIFICATION_VALIDATE_PATH,
			requestBody,
		);
	}

	// #region resolve card bin
	/**
	 * ## [Resolve Card Bin](https://paystack.com/docs/api/verification/#resolve-card)
	 * Get more information about customer's card.
	 *
	 * @param bin first 6 characters of card
	 * @return promise to resolve card
	 */
	resolveCardBin(
		bin: string,
	): Promise<ResponseDataT<ResolveCardBinResponseDataT>> {
		this.logger?.info("resolveCardBin => returning promise to resolve card");
		return this.apiClient.get<ResponseDataT<ResolveCardBinResponseDataT>>(
			`${VERIFICATION_CARD_BIN}/${bin}`,
		);
	}
}
