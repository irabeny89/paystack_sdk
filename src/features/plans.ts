import axios, { type AxiosInstance } from "axios";
import type { Logger } from "pino";
import createLogger from "../logger";
import { OptionT, PaginatedResponseT, ResponseDataT } from "../types/global";
import { PAYSTACK_BASE_URL, PLAN_PATH } from "../../config";
import { PlanBodyParamsT, PlanCreateResponseDataT, PlanListQueryParamsT, PlanResponseDataT } from "../types/plan_types";

/**
 * # [Paystack Plans API](https://paystack.com/docs/api/plan)
 * The Plans API allows you create and manage installment payment options on your integration.
 * 
 * ## Features
 * - [x] create plan
 * - [x] list plans
 * - [x] fetch plan
 * - [x] update plan
 */
export class Plan {
	readonly logLevel: OptionT["logLevel"];

	readonly logger: Logger<never> | undefined;
	/**
	 * Axios instance pre-configured with `secret` key to query the Paystack API.
	*
	* @type {AxiosInstance}
	* @memberof Transaction
	*/
	readonly axiosPaystackClient: AxiosInstance;

	// #region constructor
	/**
	 * Debug levels are: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`, `true`.
	 *
	 * This will stop at `trace` if set to `true` or `info` otherwise. Passing `silent` disables logging.
	 *
	 * @type {OptionT["logLevel"]}
	 * @memberof Transaction
	 */
	constructor(paystackSecret: string, option?: OptionT) {
		if (option?.logLevel) {
			this.logger = createLogger("transaction");

			this.logger.level = this.logLevel = option.logLevel;
		}

		this.logger?.info(
			"Transaction.constructor: creating Axios instance with (%s)",
			PAYSTACK_BASE_URL,
		);
		this.axiosPaystackClient = axios.create({
			headers: { Authorization: `Bearer ${paystackSecret}` },
			baseURL: PAYSTACK_BASE_URL,
		});
		this.logger?.info("Transaction.constructor: created Axios instance");
	}

	// #region create
	/**
	 * # [Create Plan](https://paystack.com/docs/api/plan/#create)
	 * Create a plan on your integration.
	 * @param bodyParams request body params
	 * @returns axios response
	 */
	create(bodyParams: PlanBodyParamsT) {
		this.logger?.info("plan.create: returning promise to create plan")
		this.logger?.warn(
			"plan.create: handle error for returned promised response",
		);
		return this.axiosPaystackClient.post<ResponseDataT<PlanCreateResponseDataT>>(PLAN_PATH, bodyParams);
	}

	// #region list
	/**
	 * # [List Plan](https://paystack.com/docs/api/plan/#list)
	 * List plans available on your integration.
	 * @param pathParams path parameters
	 * @returns axios response
	 */
	list(pathParams?: PlanListQueryParamsT) {
		this.logger?.info("plan.list: returning promise to list plans");
		this.logger?.warn("plan.list: handle error from promise");
		return this.axiosPaystackClient.get<PaginatedResponseT<PlanResponseDataT>>(PLAN_PATH, {
			params: pathParams
		})
	}

	// #region fetch
	/**
	 * # [Fetch Plan](https://paystack.com/docs/api/plan/#fetch)
	 * Get details of a plan on your integration.
	 * @param idOrCode the plan ID or code you want to fetch
	 * @returns axios response
	 */
	fetch(idOrCode: string) {
		this.logger?.info("plan.fetch: returning promise to fetch a plan");
		this.logger?.warn("plan.fetch: handle error from promise");
		return this.axiosPaystackClient
			.get<ResponseDataT<PlanResponseDataT>>(`${PLAN_PATH}/${idOrCode}`)
	}

	// #region update
	update(idOrCode: string, bodyParams: PlanBodyParamsT) {
		this.logger?.info("plan.update: returning promise to update plan")
		this.logger?.warn("plan.update: handle error from promise")
		return this.axiosPaystackClient
			.put(`${PLAN_PATH}/${idOrCode}`, bodyParams)
	}
}