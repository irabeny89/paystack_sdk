import { describe, beforeEach, test, expect } from "bun:test"
import { Subscription } from "../src"

describe("Subscription", () => {
  const key = Bun.env.PAYSTACK_TEST_PRIVATE_KEY ?? ""
  const subCode = "SUB_04nag7p0h2bcoen"
  let sub: Subscription

  beforeEach(() => {
    sub = new Subscription(key, { logLevel: "info" })
  })
  
  test("should list subscriptions", async () => {
    const res = await sub.list()
    expect(res.data).toBeArray()
  })

  test("should fetch subscription", async () => {
    const res = await sub.fetch(subCode)
    expect(res.data)
  })
})