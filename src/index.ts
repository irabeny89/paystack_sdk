import axios, { type AxiosInstance } from "axios";
import type { Logger } from "pino";
import { PAYSTACK_BASE_URL } from "../config";
import { Transaction, Transfer, TransferRecipient } from "./features";
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
 * - [ ] [Plans](https://paystack.com/docs/api/plans)
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
	 * Creates an instance of Paystack.
	 *
	 * @param {string} paystackSecret - paystack secret key.
	 * @param {OptionT} [option] - config options.
	 * @memberof Paystack
	 */

	constructor(paystackSecret: string, option?: OptionT) {
		if (option?.logLevel) {
			this.logger = createLogger("paystack");

			this.logger?.info("Paystack.constructor: checking and setting log level");
			this.logger.level = this.logLevel = option.logLevel;

			this.logger?.info(
				"Paystack.constructor: current set log level",
				option?.logLevel,
			);
		}

		this.logger?.info(
			"Paystack.constructor: creating Axios instance with Paystack secret and base url (%s) in header",
		);
		this.axiosPaystackClient = axios.create({
			headers: { Authorization: `Bearer ${paystackSecret}` },
			baseURL: PAYSTACK_BASE_URL,
		});
		this.logger?.info(
			"Paystack.constructor: Axios instance created with secret and base url in header",
		);

		this.logger?.info(
			"Paystack.constructor: assigning Transaction instance to Paystack instance transaction property",
		);
		this.transaction = new Transaction(paystackSecret, option);
		this.logger?.info(
			"Paystack.constructor: transaction instance assigned to Paystack instance transaction property",
		);

		this.logger?.info(
			"Paystack.constructor: assigning TransferRecipient instance to Paystack instance transferRecipient property",
		);
		this.transferRecipient = new TransferRecipient(paystackSecret, option);
		this.logger?.info(
			"Paystack.constructor: TransferRecipient instance assigned to Paystack instance TransferRecipient property",
		);

		this.logger?.info(
			"Paystack.constructor: setting transfer instance to transfer property.",
		);
		this.transfer = new Transfer(paystackSecret, option);
		this.logger?.info(
			"Paystack.constructor: transfer instance set to transfer property.",
		);
	}
}
