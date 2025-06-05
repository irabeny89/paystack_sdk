import { createHmac } from "node:crypto";

/**
 * Verifies if a given request body is a valid Paystack webhook payload.
 * @param xPaystackSignature - The signature received from Paystack, usually in the `x-paystack-signature` header.
 * @param body - The request body to verify.
 * @returns True if the signature matches the computed hash of the body, false otherwise.
 */
export function isPaystackWebhookBody(
	xPaystackSignature: string,
	body: object,
) {
	const hash = createHmac("SHA512", Bun.env.PAYSTACK_SECRET_KEY ?? "")
		.update(JSON.stringify(body))
		.digest("hex");
	return hash === xPaystackSignature;
}
