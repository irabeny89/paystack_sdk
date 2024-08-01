import {
	SUBSCRIPTION_DISABLE_PATH,
	SUBSCRIPTION_ENABLE_PATH,
	SUBSCRIPTION_PATH,
} from "../../config";
import createLogger from "../logger";
import type {
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
 */
export class Subscription {
	readonly logLevel;

	readonly logger;

	/** pre-configured with Paystack secret and base url */
	readonly apiClient;

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
	create(bodyParams: CreateBodyParamsT) {
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
	list(query: ListQueryParamsT) {
		this.logger?.info("list => sending request to list subscriptions");
		return this.apiClient.get<PaginatedResponseT<ListResponseData>>(
			SUBSCRIPTION_PATH,
			{ query },
		);
	}

	// #region fetch
	/**
	 * # [Fetch Subscription](https://paystack.com/docs/api/subscription/#fetch)
	 * Get details of a subscription on your integration.
	 * @param idOrCode the subscription ID or code that you want to fetch
	 * @returns promise to fetch a subscription
	 */
	fetch(idOrCode: string) {
		this.logger?.info("fetch => sending request to fetch subscription");
		return this.apiClient.get<PaginatedResponseT<ListResponseData>>(
			SUBSCRIPTION_PATH,
			{ path: `/:${idOrCode}` },
		);
	}

	// #region enable
	/**
	 * Enable subscription on your integration.
	 * @param body body parameter
	 * @returns promise to enable subscription
	 */
	enable(body: EnableDisableBodyParamsT) {
		this.logger?.info("enable => sending request to enable subscription");
		return this.apiClient.post(SUBSCRIPTION_ENABLE_PATH, body);
	}

	// #region disable
	/**
	 * Disable subscription on your integration.
	 * @param body body parameter
	 * @returns promise to disable subscription
	 */
	disable(body: EnableDisableBodyParamsT) {
		this.logger?.info("disable => sending request to disable subscription");
		return this.apiClient.post(SUBSCRIPTION_DISABLE_PATH, body);
	}

	// #region generate update link
	/**
	 * Generate a link for updating the card on a subscription.
	 * @param code subscription code
	 * @returns promise to generate link to update subscription card
	 */
	generateUpdateLink(code: string) {
		this.logger?.info(
			"generateUpdateLink => sending request to generate subscription card update link",
		);
		return this.apiClient.get(SUBSCRIPTION_PATH, {
			path: `/:${code}/manage/link`,
		});
	}

	// #region send update link
	/**
	 * Email a customer a link for updating the card on their subscription.
	 * @param code subscription code
	 * @returns promise to send email to update subscription card
	 */
	sendUpdateLink(code: string) {
		this.logger?.info(
			"sendUpdateLink => sending request to send subscription card update email",
		);
		return this.apiClient.get(SUBSCRIPTION_PATH, {
			path: `/:${code}/manage/email`,
		});
	}
}
