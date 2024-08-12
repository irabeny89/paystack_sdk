# Paystack SDK

This library is based on the official [Paystack][pays] payment gateway APIs.  
This will serve as a Software Development Kit (SDK) for handling payments.

## Table of Content

- [Paystack SDK](#paystack-sdk)
  - [Table of Content](#table-of-content)
  - [Technical Info](#technical-info)
  - [Installation](#installation)
  - [Features](#features)
  - [Test](#test)
  - [Conventional Commit and Release Management](#conventional-commit-and-release-management)
  - [Publish](#publish)
  - [Todo](#todo)

## Technical Info

Things to note:

- This project was generated from a [starter template][buns].
- This project was built with [Bun][buns] runtime.
- Many script commands are executed with [Bun][buns].
- Note: You do not have to use [Bun][buns] to use this library.
- [Bun][buns] may only be required when working on the library itself and not when using it in your projects.

## Installation

This package can be installed with many package managers:

```bash
  # deno
  deno add @irabeny/paystack-sdk

  # npm (use any of npx, yarn dlx, pnpm dlx, or bunx)
  npx jsr add @irabeny/paystack-sdk
```

> visit JSR for more info: <https://jsr.io/@irabeny/paystack-sdk@latest>

## Features

Most of Paystack API features are implemented.

These are the currently implemented features:

1. [Transactions][trns]
2. [Transfer Recipients][trfr]
3. [Transfers][trsf]
4. [Plans][plns]
5. [Subscriptions][subs]
6. [Verification][verf]

## Test

> To run tests on the implemented features you need to be connected to the internet.
> This is because the requests are not sent to the Paystack servers during testing (no secret key, and so on).
> But rather the error thrown from using invalid keys is caught and the parameters and arguments are validated.

To run tests, just run the command below:

```bash
  bun test
```

## Conventional Commit and Release Management

[Cocogitto][coco] is used on this library project for conventional commit and changesets.

## Publish

To publish the package to JSR (JavaScript Registry):

```bash
  # bun (use any of npx, yarn dlx, pnpm dlx, or bunx)
  bunx jsr publish
```

## Todo

- Miscellaneous

[pays]: https://paystack.com
[trns]: https://paystack.com/docs/api/transaction
[trfr]: https://paystack.com/docs/api/transfer-recipient
[trsf]: https://paystack.com/docs/api/transfers
[coco]: https://docs.cocogitto.io/
[buns]: https://github.com/wobsoriano/bun-lib-starter
[plns]: https://paystack.com/docs/api/plans
[subs]: https://paystack.com/docs/api/subscriptions
[verf]: https://paystack.com/docs/api/verification/
