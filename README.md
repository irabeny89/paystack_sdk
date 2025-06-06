# Paystack SDK

This library is based on the official [Paystack][pays] payment gateway APIs.
This will serve as a Software Development Kit (SDK) for handling payments.

## Table of Content

- [Paystack SDK](#paystack-sdk)
  - [Table of Content](#table-of-content)
  - [Technical Info](#technical-info)
  - [How To Use](#how-to-use)
  - [Installation](#installation)
  - [Typescript Configuration](#typescript-configuration)
  - [Features](#features)
  - [Test](#test)
  - [Conventional Commit and Release Management](#conventional-commit-and-release-management)

## Technical Info

Things to note:

- This project was built with [Bun][buns] runtime.
- Many script commands are executed with [Bun][buns].
- Note: You do not have to use [Bun][buns] to use this library.
- [Bun][buns] may only be required when working on the library itself and not when using it in your projects.

## How To Use

This SDK provides a simple way to interact with the Paystack API. You can create a Paystack instance using the Paystack private key. The private key is required for most functionalities. After creating the instance, you can access various features like transactions, transfers, and more through the instance methods or by importing specific feature modules. See the examples below for different instantiation methods and usage examples.

```ts
import Paystack, {
  Transaction,
  apiClient,
  convertToMainUnit,
  convertToSubUnit,
  generatePaymentReference,
  isPaystackWebhookBody,
} from "@irabeny/paystack-sdk";

const secret = "private-key";
const option = { logLevel: "info" }; // optional, may be used in non-production environments

// create a new instance, it contains all the features
const paystack = new Paystack(secret, option);
// specific features can be imported from the library
const transaction = new Transaction(secret, option);

// same feature as `transaction` instance above
const _transaction = paystack.transaction;

// call Paystack API directly with pre-configured options eg baseUrl and secret from the instance
paystack.apiClient.get("/transactions");
transaction.apiClient.get("/transactions");

// validate Paystack webhook with custom header (x-paystack-signature) value using `isPaystackWebhookBody` utility function
function validatePaystackSignature(
  headers: Record<string, string>,
  body: { event: string; data: object },
) {
  // validate webhook body using `isPaystackWebhookBody` utility function
  return isPaystackWebhookBody(headers["x-paystack-signature"], body);
}

// validate webhook signature using function above
// validatePaystackSignature(headers, body); // true

// generate payment reference using `generatePaymentReference` utility function
generatePaymentReference({ preTag: "PAY", length: 13 }); // "PAY-123456789"

// convert amount to main unit
convertToMainUnit(100); // 10000

// convert amount to sub unit
convertToSubUnit(10000); // 100
```

## Installation

This package can be installed with many package managers:

```bash
  # deno
  deno add @irabeny/paystack-sdk

  # npm (use any of npx, yarn dlx, pnpm dlx, or bunx)
  npx jsr add @irabeny/paystack-sdk
```

> visit JSR for more info: <https://jsr.io/@irabeny/paystack-sdk@latest>

## Typescript Configuration

To use this library with typescript, you need to add the following configuration to your `tsconfig.json` and `package.json` files:

```json
// tsconfig.json
{
  "moduleResolution": "bundler",
}

// package.json
{
  "type": "module"
}
```

## Features

Most of Paystack API features are implemented.

These are the currently implemented features:

1. [Transactions][trns]
2. [Transfer Recipients][trfr]
3. [Transfers][trsf]
4. [Plans][plns]
5. [Subscriptions][subs]
6. [Verification][verf]
7. [Miscellaneous][misc]

## Test

> To run tests on the implemented features you need to be connected to the internet.
> To run tests on implemented features you will require to store your paystack test key as environment variable in `PAYSTACK_TEST_PRIVATE_KEY`

To run tests, just run the command below:

```bash
  # utils tests
  bun run test-utils
  # or features test - require PAYSTACK_TEST_PRIVATE_KEY
  bun run test-feats
  # or all tests - require PAYSTACK_TEST_PRIVATE_KEY
  bun test
```

## Conventional Commit and Release Management

[Cocogitto][coco] is used on this library project for conventional commit and changesets.

[pays]: https://paystack.com
[coco]: https://docs.cocogitto.io/
[buns]: https://github.com/wobsoriano/bun-lib-starter
[trns]: https://paystack.com/docs/api/transaction
[trfr]: https://paystack.com/docs/api/transfer-recipient
[trsf]: https://paystack.com/docs/api/transfers
[plns]: https://paystack.com/docs/api/plans
[subs]: https://paystack.com/docs/api/subscriptions
[verf]: https://paystack.com/docs/api/verification/
[misc]: https://paystack.com/docs/api/miscellaneous/
