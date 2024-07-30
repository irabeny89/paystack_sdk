import { Plan, Transaction, Transfer, TransferRecipient } from "./features";
import createLogger from "./logger";
import type { OptionT } from "./types/global";
import createApiClient from "./utils/api_client";

export { Transaction, Transfer, TransferRecipient } from "./features";
export { convertToMainUnit, convertToSubUnit } from "./utils";

// #region paystack
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
 */
export default class Paystack {
	/**
	 * Debug levels are: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`, `true`.
	 *
	 * This will stop at `trace` if set to `true` or `info` otherwise. Passing `silent` disables logging.
	 */
	readonly logLevel;

	readonly logger;

	/** pre-configured with Paystack secret and base url */
	readonly apiClient;

	// #region transaction
	/**
	 * ## Features
	 * - [x] check and set log level.
	 * - [x] Axios client pre-configured to connect to Paystack.
	 * - [x] Initialize transactions.
	 * - [x] Verify transactions.
	 * - [x] List transactions.
	 * - [x] Fetch transaction.
	 * - [x] Charge authorizations(auto charging without entering card details).
	 * - [x] Timeline of transactions.
	 * - [x] Total amount received.
	 * - [x] Export transaction records (currently as CSV file).
	 * - [x] Partial debiting of customers.
	 * # [Paystack Transaction API](https://paystack.com/docs/api/transaction)
	 * The transactions API allows you to create and manage payments on your integration.
	 *
	 * ## Info
	 * * There are utility functions to handle `amount` conversions i.e `convertToSubUnit` and `convertToMainUnit`.
	 * * `perPage` and `page` has default values `50` and `1` respectively.
	 *
	 * ## Note
	 * ! `amount` is in sub unit i.e N1, $1 e.t.c equals `100`.
	 * ! Do not use the `reference` to verify on the frontend so as to not expose your Paystack secret.
	 * ! If using `from` and `to` then value should be timestamps eg `2023-04-24T13:29:03.264Z` or `2023-04-24`.
	 */
	readonly transaction: Transaction;

	/**
	 * # [Paystack Transfer Recipient API](https://paystack.com/docs/api/transfer-recipient)
	 * The Transfer Recipients API allows you create and manage beneficiaries that you send money to.
	 *
	 * ## Features To Do
	 * - [x] Transfer recipient create
	 * - [x] Transfer recipient bulk create
	 * - [x] Transfer recipient list
	 * - [x] Transfer recipient fetch one
	 * - [x] Transfer recipient update
	 *
	 * ## Info
	 * * `perPage` and `page` has value `50` and `1` respectively.
	 *
	 * ## Note
	 * ! If using `from` and `to` then value should be timestamps eg `2023-04-24T13:29:03.264Z` or `2023-04-24`.
	 */
	readonly transferRecipient: TransferRecipient;

	// #region transfer
	/**
	 * # [Paystack Transfer API](https://paystack.com/docs/api/transfer)
	 * Send money to your customers.
	 *
	 * Status of transfer object returned will be pending if OTP is disabled. In the event that an OTP is required, status will read otp.
	 *
	 * ## Features To Do
	 * - [x] Check and set log level.
	 * - [x] Initiate Transfer
	 * - [x] Finalize Transfer
	 * - [x] Initiate Bulk Transfer
	 * - [x] List Transfers
	 * - [x] Fetch One Transfer
	 * - [x] Verify Transfer
	 *
	 * ## Info
	 * * There are utility functions to handle `amount` conversions i.e `convertToSubUnit` and `convertToMainUnit`.
	 * * `perPage` and `page` has default values `50` and `1` respectively.
	 * * Log levels are: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`, `true`.
	 *
	 * * The log level will set to `trace` if `true` is passed or `info` otherwise. Passing `silent` disables logging.
	 *
	 * ## Note
	 * ! Create a transfer recipient first because data from that will be used here.
	 * ! Disable the transfer OTP requirement to use `initiateBulk` method.
	 */
	readonly transfer;

	// #region plan
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
	readonly plan;

	// #region constructor
	/**
	 * Creates an instance of Paystack.
	 *
	 * @param {string} paystackSecret - paystack secret key.
	 * @param {OptionT} [option] - config options.
	 */

	constructor(paystackSecret: string, option?: OptionT) {
		if (option?.logLevel) {
			this.logger = createLogger("Paystack");

			this.logger?.info(
				"constructor => setting and adding log level (%s) -> logLevel",
				option.logLevel,
			);
			this.logger.level = this.logLevel = option.logLevel;
		}
		this.logger?.info("constructor => adding API client -> apiClient");
		this.apiClient = createApiClient(paystackSecret);

		this.logger?.info(
			"constructor => adding Transaction instance -> transaction",
		);
		this.transaction = new Transaction(paystackSecret, option);

		this.logger?.info(
			"constructor => adding Transfer Recipient instance -> transferRecipient",
		);
		this.transferRecipient = new TransferRecipient(paystackSecret, option);

		this.logger?.info("constructor => adding Transfer instance -> transfer");
		this.transfer = new Transfer(paystackSecret, option);

		this.logger?.info("constructor => adding Plan instance -> plan");
		this.plan = new Plan(paystackSecret, option);
	}
}
