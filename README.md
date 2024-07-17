# Paystack SDK

This library is based on the official [Paystack][pays] payment gateway APIs. This will serve as a Software Development Kit (SDK) for handling payments.

> This project was generated from a [starter template][buns]

## Table of Content

- [Paystack SDK](#paystack-sdk)
  - [Table of Content](#table-of-content)
  - [Features](#features)
  - [Conventional Commit and Release Management](#conventional-commit-and-release-management)
  - [Todo](#todo)

## Features

Most of Paystack API features are implemented.

These are the currently implemented features:

1. [Transactions][trns]
2. [Transfer Recipients][trfr]
3. [Transfers][trsf]
4. [Plans][plns]
5. [Subscriptions][subs]

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
