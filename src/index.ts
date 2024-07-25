import axios, { type AxiosInstance } from "axios";
import type { Logger } from "pino";
import { PAYSTACK_BASE_URL } from "../config";
import { Plan, Transaction, Transfer, TransferRecipient } from "./features";
import createLogger from "./logger";
import type { OptionT } from "./types/global";

export { Transaction, Transfer, TransferRecipient } from "./features";
export { convertToMainUnit, convertToSubUnit } from "./utils";

/**
 * # Paystack SDK
 * Paystack constructor to access all its API features.
 *
 * ## Features
 * - [x] [Transactions](https://paystack.com/docs/api/transactions)
 * - [x] [Transfer Recipients](https://paystack.com/docs/api/transfer-recipient)
 * - [x] [Transfers](https://paystack.com/docs/api/transfer)
 * - [x] [Plans](https://paystack.com/docs/api/plans)
 * - [ ] [Subscriptions](https://paystack.com/docs/api/subscription)
 *
 * @export
 * @class Paystack
 */
export default class Paystack {
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
	 * Axios instance pre-configured with secret to query the Paystack API directly
	 *
	 * @type {AxiosInstance}
	 * @memberof TransferRecipient
	 */
	readonly axiosPaystackClient: AxiosInstance;

	/**
	 * Transaction object to manage transactions
	 *
	 * @type {Transaction}
	 * @memberof Paystack
	 */
	readonly transaction: Transaction;

	/**
	 * Transfer recipient creation object property to manage transfers
	 *
	 * @type {TransferRecipient}
	 * @memberof Paystack
	 */
	readonly transferRecipient: TransferRecipient;

	/**
	 * Transfer object with methods to manage transfers.
	 *
	 * @type {Transfer}
	 * @memberof Paystack
	 */
	readonly transfer: Transfer;

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
	readonly plan: Plan;

	/**
	 * Creates an instance of Paystack.
	 *
	 * @param {string} paystackSecret - paystack secret key.
	 * @param {OptionT} [option] - config options.
	 */

	constructor(paystackSecret: string, option?: OptionT) {
		if (option?.logLevel) {
			this.logger = createLogger("Paystack");

			this.logger?.info("constructor => setting and adding log level (%s) -> logLevel", option.logLevel);
			this.logger.level = this.logLevel = option.logLevel;
		}

		this.logger?.info(
			"constructor => adding custom Axios client -> axiosPaystackClient",
		);
		this.axiosPaystackClient = axios.create({
			headers: { Authorization: `Bearer ${paystackSecret}` },
			baseURL: PAYSTACK_BASE_URL,
		});

		this.logger?.info(
			"constructor => adding Transaction instance -> transaction",
		);
		this.transaction = new Transaction(paystackSecret, option);

		this.logger?.info(
			"constructor => adding Transfer Recipient instance -> transferRecipient",
		);
		this.transferRecipient = new TransferRecipient(paystackSecret, option);

		this.logger?.info(
			"constructor => adding Transfer instance -> transfer",
		);
		this.transfer = new Transfer(paystackSecret, option);

		this.logger?.info("constructor => adding Plan instance -> plan");
		this.plan = new Plan(paystackSecret, option)
	}
}
