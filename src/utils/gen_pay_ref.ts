import { randomUUID } from "node:crypto"
/**
 * Generates a payment reference string.
 * N.B - Useful with Paystack.
 * @param param0 - An object with optional `max` and `preTag` properties.
 * @param param0.max - The maximum length of the reference string (default is 16).  Must be either 10 or 16.
 * @param param0.preTag - An optional prefix to add to the reference string.  Invalid characters will be removed. The length of this tag should not exceed half of the `max` length.
 * @returns A payment reference string.
 */
export function generatePaymentReference({
  max = 16,
  preTag,
}: {
  max?: 10 | 16;
  preTag?: string;
}) {
  // slice max string length starting from the last
  let ref = randomUUID().slice(-max);
  if (preTag) {
    // sanitize preTag
    const tag = preTag
      // remove invalid characters
      .replace(/[^\w\d\-\.\,\=]/g, "")
      // tag should not be longer than half of max length
      .slice(0, max / 2);
    // remove enough to fit valid tag - `+1` to allow `-` after tag
    ref = `${tag}-${ref.slice(tag.length + 1)}`;
  }
  return ref;
}
