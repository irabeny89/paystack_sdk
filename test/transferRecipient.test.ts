import { describe, beforeEach, test, expect } from "bun:test"
import { TransferRecipient } from "../src"

describe("Transfer Recipient", () => {
  const key = Bun.env.PAYSTACK_TEST_PRIVATE_KEY
  const recCode = "RCP_38aiaq02p087et4"
  let trfRec: TransferRecipient

  beforeEach(() => {
    trfRec = new TransferRecipient(key ?? "", { logLevel: "info" })
  })

  test("should list transfer recipients", async () => {
    const res = await trfRec.list()
    expect(res.data).toBeArray()
  })

  test("should fetch transfer recipient", async () => {
    const res = await trfRec.fetch(recCode)
    expect(res.status).toBeTrue()
  })
})