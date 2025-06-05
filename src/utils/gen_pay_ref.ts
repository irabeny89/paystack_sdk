import { randomUUID } from "node:crypto";
/**
 * Generates a payment reference string.
 *
 * N.B - Useful with Paystack.
 *
 * N.B - The generated reference is not guaranteed to be unique.
 *
 * N.B - Valid characters for a payment reference are alpha-numeric(`Aa-Zz-0-9`), hyphen(`-`), period(`.`), comma(`,`), and equals sign(`=`).
 *
 * @param param0 - An object with optional `max` and `preTag` properties.
 * @param param0.max - The maximum length of the reference string (default is 16).  Must be either 10 or 16.
 * @param param0.preTag - An optional prefix to add to the reference string.  Invalid characters(characters other than alpha-numeric, hyphens, periods, commas, and equals signs) will be removed. The length of this tag should not exceed half of the `max` length.
 * @returns A payment reference string.
 */
export function generatePaymentReference({
	max = 16,
	preTag,
}:
	| {
			max?: 10 | 16;
			preTag?: string;
	  }
	| undefined = {}): string {
	// slice max string length starting from the last
	let ref = randomUUID().slice(-max);
	if (preTag) {
		// sanitize preTag
		const tag = preTag
			// remove invalid characters
			.replace(/[^a-zA-Z0-9\-\.\,\=]/g, "")
			// tag should not be longer than half of max length
			.slice(0, max / 2);
		// remove enough to fit valid tag - `+1` to allow `-` after tag
		ref = `${tag}-${ref.slice(tag.length + 1)}`;
	}
	return ref;
}
