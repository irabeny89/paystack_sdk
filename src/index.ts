import axios, { type AxiosInstance } from "axios";
import { PAYSTACK_BASE_URL } from "../config";
import { Transaction, Transfer, TransferRecipient } from "./features";
import logger from "./logger";
import type { OptionT } from "./types/global";

export { Transaction, Transfer, TransferRecipient } from "./features";
export { convertToMainUnit, convertToSubUnit } from "./utils";

let _logger: null | typeof logger;

/**
 * Paystack constructor to access all its API features
 *
 * @export
 * @class Paystack
 */
export default class Paystack {
	/**
	 * Axios instance preconfigured with secret to query the Paystack API directly
	 *
	 * @type {AxiosInstance}
	 * @memberof TransferRecipient
	 */
	axiosPaystackClient: AxiosInstance;

	/**
	 * Transaction object to manage transactions
	 *
	 * @type {Transaction}
	 * @memberof Paystack
	 */
	transaction: Transaction;

	/**
	 * Transfer recipient creation object property to manage transfers
	 *
	 * @type {TransferRecipient}
	 * @memberof Paystack
	 */
	transferRecipient: TransferRecipient;

	/**
	 * Transfer object with methods to manage transfers.
	 *
	 * @type {Transfer}
	 * @memberof Paystack
	 */
	transfer: Transfer;

	/**
	 * Creates an instance of Paystack.
	 *
	 * @param {string} paystackSecret - paystack secret key.
	 * @param {OptionT} [option] - config options.
	 * @memberof Paystack
	 */
	constructor(paystackSecret: string, option?: OptionT) {
		_logger?.info("Paystack.constructor: checking and setting log level");
		if (option?.logLevel) {
			logger.level = option.logLevel;
			_logger = logger;
		}
		_logger?.info(
			"Paystack.constructor: current set log level",
			option?.logLevel,
		);

		_logger?.info(
			"Paystack.constructor: creating Axios instance with Paystack secret and base url (%s) in header",
		);
		this.axiosPaystackClient = axios.create({
			headers: { Authorization: `Bearer ${paystackSecret}` },
			baseURL: PAYSTACK_BASE_URL,
		});
		_logger?.info(
			"Paystack.constructor: Axios instance created with secret and base url in header",
		);

		_logger?.info(
			"Paystack.constructor: assigning Transaction instance to Paystack instance transaction property",
		);
		this.transaction = new Transaction(paystackSecret, option);
		_logger?.info(
			"Paystack.constructor: transaction instance assigned to Paystack instance transaction property",
		);

		_logger?.info(
			"Paystack.constructor: assigning TransferRecipient instance to Paystack instance transferRecipient property",
		);
		this.transferRecipient = new TransferRecipient(paystackSecret, option);
		_logger?.info(
			"Paystack.constructor: TransferRecipient instance assigned to Paystack instance TransferRecipient property",
		);

		_logger?.info(
			"Paystack.constructor: setting transfer instance to transfer property.",
		);
		this.transfer = new Transfer(paystackSecret, option);
		_logger?.info(
			"Paystack.constructor: transfer instance set to transfer property.",
		);
	}
}
