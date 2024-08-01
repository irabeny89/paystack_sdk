import axios, { type AxiosInstance } from "axios";
import type { Logger } from "pino";
import { PAYSTACK_BASE_URL, PLAN_PATH } from "../../config";
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
	readonly logLevel: OptionT["logLevel"];

	readonly logger: Logger<never> | undefined;
	/**
	 * Axios instance pre-configured with `secret` key to query the Paystack API.
	 */
	readonly axiosPaystackClient: AxiosInstance;

	// #region constructor
	constructor(paystackSecret: string, option?: OptionT) {
		if (option?.logLevel) {
			this.logger = createLogger("Transaction");

			this.logger.level = this.logLevel = option.logLevel;
		}

		this.logger?.info(
			"constructor => creating Axios instance with (%s)",
			PAYSTACK_BASE_URL,
		);
		this.axiosPaystackClient = axios.create({
			headers: { Authorization: `Bearer ${paystackSecret}` },
			baseURL: PAYSTACK_BASE_URL,
		});
		this.logger?.info("constructor => created Axios instance");
	}

	// #region create
	/**
	 * # [Create Plan](https://paystack.com/docs/api/plan/#create)
	 * Create a plan on your integration.
	 * @param bodyParams request body params
	 * @returns axios response
	 */
	create(bodyParams: PlanBodyParamsT) {
		this.logger?.info("create => returning promise to create plan");
		this.logger?.warn("create => handle error for returned promised response");
		return this.axiosPaystackClient.post<ResponseDataT<PlanDataT>>(
			PLAN_PATH,
			bodyParams,
		);
	}

	// #region list
	/**
	 * # [List Plan](https://paystack.com/docs/api/plan/#list)
	 * List plans available on your integration.
	 * @param pathParams path parameters
	 * @returns axios response
	 */
	list(pathParams?: PlanListQueryParamsT) {
		this.logger?.info("list => returning promise to list plans");
		this.logger?.warn("list => handle error from promise");
		return this.axiosPaystackClient.get<PaginatedResponseT<PlanResponseDataT>>(
			PLAN_PATH,
			{
				params: pathParams,
			},
		);
	}

	// #region fetch
	/**
	 * # [Fetch Plan](https://paystack.com/docs/api/plan/#fetch)
	 * Get details of a plan on your integration.
	 * @param idOrCode the plan ID or code you want to fetch
	 * @returns Axios response
	 */
	fetch(idOrCode: string) {
		this.logger?.info("fetch => returning promise to fetch a plan");
		this.logger?.warn("fetch => handle error from promise");
		return this.axiosPaystackClient.get<ResponseDataT<PlanResponseDataT>>(
			`${PLAN_PATH}/${idOrCode}`,
		);
	}

	// #region update
	/**
	 * # [Update Plan](https://paystack.com/docs/api/plan/#update)
	 * Update a plan details on your integration
	 * @param idOrCode plan's ID or code
	 * @param bodyParams request body parameters
	 * @returns Axios response
	 */
	update(idOrCode: string, bodyParams: PlanBodyParamsT) {
		this.logger?.info("update => returning promise to update plan");
		this.logger?.warn("update => handle error from promise");
		return this.axiosPaystackClient.put(`${PLAN_PATH}/${idOrCode}`, bodyParams);
	}
}
