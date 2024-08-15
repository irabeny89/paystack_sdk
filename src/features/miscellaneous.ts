import type pino from "pino";
import type { Logger } from "pino";
import {
	MISC_BANKS_PATH,
	MISC_COUNTRIES_PATH,
	MISC_STATES_PATH,
} from "../../config";
import createLogger from "../logger";
import type { ApiClientT, OptionT, PaginatedResponseT } from "../types/global";
import type {
	ListBankQueryParamsT,
	ListBankResponseDataT,
	ListCountriesResponseDataT,
	ListStatesResponseDataT,
} from "../types/misc_types";
import { createApiClient } from "../utils/api_client";

/**
 * # [Miscellaneous](https://paystack.com/docs/api/miscellaneous/)
 * The Miscellaneous API are supporting APIs that can be used to provide more details to other APIs.
 *
 * ## Features
 * - [x] list banks
 * - [x] list countries
 * - [x] list states
 *
 * @examples
 * ```ts
 *  const misc = new Misc("paystack-secret-key", { logLevel: "info" })
 * ```
 */
export class Misc {
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
			this.logger = createLogger("Misc");

			this.logger?.info(
				"constructor => setting and adding log level (%s) -> logLevel",
				option.logLevel,
			);
			this.logger.level = this.logLevel = option.logLevel;
		}
		
		this.apiClient = createApiClient(paystackSecret);
	}

	// #region list banks
	/**
	 * # [List Banks](https://paystack.com/docs/api/miscellaneous/#bank)
	 * Get a list of all supported banks and their properties.
	 *
	 * @param query query parameters
	 * @return promise to list banks
	 */
	listBanks(
		query: ListBankQueryParamsT,
	): Promise<PaginatedResponseT<ListBankResponseDataT[]>> {
		this.logger?.info("listBanks => returning promise to list banks");
		return this.apiClient.get<PaginatedResponseT<ListBankResponseDataT[]>>(
			MISC_BANKS_PATH,
			query,
		);
	}

	// #region list countries
	/**
	 * # [List Countries](https://paystack.com/docs/api/miscellaneous/#country)
	 * Gets a list of countries that Paystack currently supports.
	 * @returns promise to list countries
	 */
	listCountries(): Promise<PaginatedResponseT<ListCountriesResponseDataT>> {
		this.logger?.info("listCountries => returning promise to list countries");
		return this.apiClient.get<PaginatedResponseT<ListCountriesResponseDataT>>(
			MISC_COUNTRIES_PATH,
		);
	}

	// #region list states
	/**
	 * # [List States (AVS)](https://paystack.com/docs/api/miscellaneous/#avs-states)
	 * Get a list of states for a country for address verification.
	 * @param country country code of the states to list. It is gotten after the charge request
	 * @return promise to list states
	 */
	listStates(
		country: string,
	): Promise<PaginatedResponseT<ListStatesResponseDataT>> {
		this.logger?.info("listStates => returning promise to list states");
		return this.apiClient.get<PaginatedResponseT<ListStatesResponseDataT>>(
			MISC_STATES_PATH,
			{ country },
		);
	}
}
