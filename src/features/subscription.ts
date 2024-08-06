import pino, { Logger } from "pino";
import {
	SUBSCRIPTION_DISABLE_PATH,
	SUBSCRIPTION_ENABLE_PATH,
	SUBSCRIPTION_PATH,
} from "../../config";
import createLogger from "../logger";
import type {
	ApiClientT,
	OptionT,
	PaginatedResponseT,
	ResponseDataT,
} from "../types/global";
import type {
	CreateBodyParamsT,
	EnableDisableBodyParamsT,
	ListQueryParamsT,
	ListResponseData,
	SubscriptionT,
} from "../types/subscription_types";
import createApiClient from "../utils/api_client";

/**
 * # [Subscription](https://paystack.com/docs/api/subscription/#subscriptions)
 * The Subscriptions API allows you create and manage recurring payment on your integration.
 *
 * ## Features
 * - [x] Create subscription
 * - [x] List subscriptions
 * - [x] Fetch subscription
 * - [x] Enable subscription
 * - [x] Disable subscription
 * - [x] Generate update subscription link
 * - [x] Send email to update subscription link
 * 
 * @example
 * ```ts
 * 	const paystack = new Subscription("paystack-secret-key", { logLevel: "info" })
 * ```
 */
export class Subscription {
	/**
	 * Debug levels are: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`, `true`.
	 *
	 * This will stop at `trace` if set to `true` or `info` otherwise. Passing `silent` disables logging.
	 */
	readonly logLevel: pino.Level | "silent" | undefined;

	readonly logger: Logger<never> | undefined;

	/** pre-configured with Paystack secret and base url */
	readonly apiClient: ApiClientT;;

	// #region constructor
	constructor(paystackSecret: string, option?: OptionT) {
		if (option?.logLevel) {
			this.logger = createLogger("Subscription");

			this.logger?.info(
				"constructor => setting and adding log level (%s) -> logLevel",
				option.logLevel,
			);
			this.logger.level = this.logLevel = option.logLevel;
		}

		this.logger?.info("constructor => adding API client -> apiClient");
		this.apiClient = createApiClient(paystackSecret);
	}

	// #region create
	/**
	 * # [Create Subscription](https://paystack.com/docs/api/subscription/#create)
	 * Create a subscription on your integration.
	 * @param bodyParams body parameters
	 * @returns promise to create subscription
	 */
	create(bodyParams: CreateBodyParamsT): Promise<ResponseDataT<SubscriptionT>> {
		this.logger?.info("create => sending request to create subscription");
		return this.apiClient.post<ResponseDataT<SubscriptionT>, CreateBodyParamsT>(
			SUBSCRIPTION_PATH,
			bodyParams,
		);
	}

	// #region list
	/**
	 * # [List Subscriptions](https://paystack.com/docs/api/subscription/#list)
	 * List subscriptions available on your integration.
	 * @param params path params
	 * @returns promise to list subscriptions
	 */
	list(params: ListQueryParamsT): Promise<PaginatedResponseT<ListResponseData>> {
		this.logger?.info("list => sending request to list subscriptions");
		return this.apiClient.get<PaginatedResponseT<ListResponseData>>(
			SUBSCRIPTION_PATH,
			params,
		);
	}

	// #region fetch
	/**
	 * # [Fetch Subscription](https://paystack.com/docs/api/subscription/#fetch)
	 * Get details of a subscription on your integration.
	 * @param idOrCode the subscription ID or code that you want to fetch
	 * @returns promise to fetch a subscription
	 */
	fetch(idOrCode: string): Promise<PaginatedResponseT<ListResponseData>> {
		this.logger?.info("fetch => sending request to fetch subscription");
		return this.apiClient.get<PaginatedResponseT<ListResponseData>>(
			SUBSCRIPTION_PATH,
			{ path: `/${idOrCode}` },
		);
	}

	// #region enable
	/**
	 * # [Enable Subscription](https://paystack.com/docs/api/subscription/#enable)
	 * Enable subscription on your integration.
	 * @param body body parameter
	 * @returns promise to enable subscription
	 */
	enable(body: EnableDisableBodyParamsT): Promise<Pick<ResponseDataT<unknown>, "message" | "status">> {
		this.logger?.info("enable => sending request to enable subscription");
		return this.apiClient.post<Pick<ResponseDataT<unknown>, "message" | "status">>(SUBSCRIPTION_ENABLE_PATH, body);
	}

	// #region disable
	/**
	 * # [Disable Subscription](https://paystack.com/docs/api/subscription/#disable)
	 * Disable subscription on your integration.
	 * @param body body parameter
	 * @returns promise to disable subscription
	 */
	disable(body: EnableDisableBodyParamsT): Promise<Pick<ResponseDataT<unknown>, "message" | "status">> {
		this.logger?.info("disable => sending request to disable subscription");
		return this.apiClient.post<Pick<ResponseDataT<unknown>, "message" | "status">>(SUBSCRIPTION_DISABLE_PATH, body);
	}

	// #region generate update link
	/**
	 * # [Generate Update Subscription Link](https://paystack.com/docs/api/subscription/#manage-link)
	 * Generate a link for updating the card on a subscription.
	 * @param code subscription code
	 * @returns promise to generate link to update subscription card
	 */
	generateUpdateLink(code: string): Promise<ResponseDataT<Record<"link", string>>> {
		this.logger?.info(
			"generateUpdateLink => sending request to generate subscription card update link",
		);
		return this.apiClient.get<ResponseDataT<Record<"link", string>>>(`${SUBSCRIPTION_PATH}/${code}/manage/link`);
	}

	// #region send update link
	/**
	 * # [Send Update Subscription Link](https://paystack.com/docs/api/subscription/#manage-email)
	 * Email a customer a link for updating the card on their subscription.
	 * @param code subscription code
	 * @returns promise to send email to update subscription card
	 */
	sendUpdateLink(code: string): Promise<Pick<ResponseDataT<unknown>, "message" | "status">> {
		this.logger?.info(
			"sendUpdateLink => sending request to send subscription card update email",
		);
		return this.apiClient.get<Pick<ResponseDataT<unknown>, "message" | "status">>(`${SUBSCRIPTION_PATH}/${code}/manage/email`);
	}
}
