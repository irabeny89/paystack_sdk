# Paystack SDK

This library is based on the official [Paystack][pays] payment gateway APIs.  
This will serve as a Software Development Kit (SDK) for handling payments.

## Table of Content

- [Paystack SDK](#paystack-sdk)
  - [Table of Content](#table-of-content)
  - [Technical Info](#technical-info)
  - [Features](#features)
  - [Test](#test)
  - [Conventional Commit and Release Management](#conventional-commit-and-release-management)
  - [Todo](#todo)

## Technical Info

Things to note:

- This project was generated from a [starter template][buns].
- This project was built with [Bun][buns] runtime.
- Many script commands are executed with [Bun][buns].
- Note: You do not have to use [Bun][buns] to use this library. 
- [Bun][buns] may only be required when working on the library itself and not when using it in your projects.

## Features

Most of Paystack API features are implemented.

These are the currently implemented features:

1. [Transactions][trns]
2. [Transfer Recipients][trfr]
3. [Transfers][trsf]
4. [Plans][plns]
5. [Subscriptions][subs]

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

## Todo

- [ ] add [plans][plns]
- [ ] add [subscriptions][subs]
- [ ] add [cocogitto bot][cogb] to github

[pays]: https://paystack.com
[trns]: https://paystack.com/docs/api/transaction
[trfr]: https://paystack.com/docs/api/transfer-recipient
[trsf]: https://paystack.com/docs/api/transfers
[coco]: https://docs.cocogitto.io/
[buns]: https://github.com/wobsoriano/bun-lib-starter
[cogb]: https://docs.cocogitto.io/ci_cd/#github-bot
[plns]: https://paystack.com/docs/api/plans
[subs]: https://paystack.com/docs/api/subscriptions
