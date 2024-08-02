import { PLAN_PATH } from "../../config";
import createLogger from "../logger";
import type {
	OptionT,
	PaginatedResponseT,
	ResponseDataT,
} from "../types/global";
import type {
	PlanBodyParamsT,
	PlanDataT,
	PlanListQueryParamsT,
	PlanResponseDataT,
} from "../types/plan_types";
import createApiClient from "../utils/api_client";

/**
 * # [Paystack Plans API](https://paystack.com/docs/api/plan)
 * The Plans API allows you create and manage installment payment options on your integration.
 *
 * ## Features
 * - [x] create plan
 * - [x] list plans
 * - [x] fetch plan
 * - [x] update plan
 *
 * ## Info
 * * There are utility functions to handle `amount` conversions i.e `convertToSubUnit` and `convertToMainUnit`.
 * * `perPage` and `page` has default values `50` and `1` respectively.
 * * Log levels are: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`, `true`.
 *
 * * The log level will set to `trace` if `true` is passed or `info` otherwise. Passing `silent` disables logging.
 */
export class Plan {
	/**
	 * Debug levels are: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`, `true`.
	 *
	 * This will stop at `trace` if set to `true` or `info` otherwise. Passing `silent` disables logging.
	 */
	readonly logLevel;

	readonly logger;

	/** pre-configured with Paystack secret and base url */
	readonly apiClient;

	// #region constructor
	constructor(paystackSecret: string, option?: OptionT) {
		if (option?.logLevel) {
			this.logger = createLogger("Plan");

			this.logger.level = this.logLevel = option.logLevel;
		}

		this.logger?.info("constructor => adding API client -> apiClient");
		this.apiClient = createApiClient(paystackSecret);
	}

	// #region create
	/**
	 * # [Create Plan](https://paystack.com/docs/api/plan/#create)
	 * Create a plan on your integration.
	 * @param bodyParams request body params
	 * @returns promise to create plan
	 */
	create(bodyParams: PlanBodyParamsT) {
		this.logger?.info("create => returning promise to create plan");
		return this.apiClient.post<ResponseDataT<PlanDataT>>(PLAN_PATH, bodyParams);
	}

	// #region list
	/**
	 * # [List Plan](https://paystack.com/docs/api/plan/#list)
	 * List plans available on your integration.
	 * @param pathParams path parameters
	 * @returns promise to list plans
	 */
	list(pathParams?: PlanListQueryParamsT) {
		this.logger?.info("list => returning promise to list plans");
		return this.apiClient.get<PaginatedResponseT<PlanResponseDataT>>(
			PLAN_PATH,
			pathParams,
		);
	}

	// #region fetch
	/**
	 * # [Fetch Plan](https://paystack.com/docs/api/plan/#fetch)
	 * Get details of a plan on your integration.
	 * @param idOrCode the plan ID or code you want to fetch
	 * @returns promise to fetch plan
	 */
	fetch(idOrCode: string) {
		this.logger?.info("fetch => returning promise to fetch a plan");
		return this.apiClient.get<ResponseDataT<PlanResponseDataT>>(
			`${PLAN_PATH}/${idOrCode}`,
		);
	}

	// #region update
	/**
	 * # [Update Plan](https://paystack.com/docs/api/plan/#update)
	 * Update a plan details on your integration
	 * @param idOrCode plan's ID or code
	 * @param bodyParams request body parameters
	 * @returns promise to update plan
	 */
	update(idOrCode: string, bodyParams: PlanBodyParamsT) {
		this.logger?.info("update => returning promise to update plan");
		return this.apiClient.put(`${PLAN_PATH}/${idOrCode}`, bodyParams);
	}
}
