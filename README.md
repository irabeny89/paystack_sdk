# Paystack SDK

This library is based on the official [Paystack][1] payment gateway APIs. This will serve as a Software Development Kit (SDK) for handling payments.

> This project was generated from a [starter template][6]

## Table of Content

- [Paystack SDK](#paystack-sdk)
  - [Table of Content](#table-of-content)
  - [Features](#features)
    - [Transactions](#transactions)
    - [Transfer Recipients](#transfer-recipients)
    - [Transfers](#transfers)
    - [Todos](#todos)
  - [Conventional Commit and Release Management](#conventional-commit-and-release-management)

## Features

Most of Paystack API features are implemented.

These are the currently implemented features:

1. [Transactions](#transactions)
2. [Transfer Recipients](#transfer-recipients)
3. [Transfers](#transfers)

### Transactions

> [Official Transaction API docs][2]

The API to receive payments. Use to charge users.

Below are currently implemented features:

1. Initialize transactions
2. Verify transactions
3. List transactions
4. Fetch one transaction
5. Charge authorizations(auto charging without entering card details)
6. Timeline of transactions
7. Total amount received
8. Export transaction records (currently as CSV file)
9. Partial debitting of customers

### Transfer Recipients

> [Official Transfer Recipient API docs][3]

The API is used to create and manage who we send money to.

Below are currently implemented features:

1. Transfer recipient create
2. Transfer recipient bulk create
3. Transfer recipient list
4. Transfer recipient fetch one
5. Transfer recipient update

### Transfers

> [Official Transfer Recipient API docs][4]

The Transfers API allows you automate sending money to your customers.

Below are currently implemented features:

1. Initiate Transfer
2. Finalize Transfer
3. Initiate Bulk Transfer
4. List Transfers
5. Fetch One Transfer
6. Verify Transfer

### Todos

- [ ] add [cocogitto bot][7] to github

## Conventional Commit and Release Management

[Cocogitto][5] is used on this library project for conventional commit and changesets.

[1]: https://paystack.com
[2]: https://paystack.com/docs/api/transaction
[3]: https://paystack.com/docs/api/transfer-recipient
[4]: https://paystack.com/docs/api/transfers
[5]: https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://docs.cocogitto.io/&ved=2ahUKEwig9a7Fxe2GAxU2TKQEHR-ID7cQFnoECBAQAQ&usg=AOvVaw1rvGlr7OxJYz0tip4KSUG8
[6]: https://github.com/wobsoriano/bun-lib-starter
[7]: https://docs.cocogitto.io/ci_cd/#github-bot
