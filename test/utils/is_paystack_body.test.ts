import { describe, expect, test } from "bun:test";
import { isPaystackWebhookBody } from "../../src";
import { createHmac } from "node:crypto";

describe("isPaystackWebhookBody", () => {
  const body = {
    event: "charge.success",
    data: { metadata: { id: "1234" } },
  };
  const signature = createHmac("SHA512", Bun.env.PAYSTACK_SECRET_KEY ?? "")
    .update(JSON.stringify(body))
    .digest("hex");

  test("should return true for valid body", () => {
    expect(isPaystackWebhookBody(signature, body)).toBe(true);
  });

  test("should return false for invalid body", () => {
    expect(
      isPaystackWebhookBody(signature, { ...body, event: "charge.failed" }),
    ).toBe(false);
  });
});
