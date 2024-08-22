/**
 * Converts an amount to it's sub unit. This is useful because Paystack expects amounts to be in sub units for their supported currencies.
 *
 * eg:
 * * `1` Nigerian Naira -> `100` Kobo
 * * `1` Ghanian Cedi -> `100` Pesewas
 * * `1` S.African Rand -> `100` Cent
 * * `1` US Dollar -> `100` Cent
 *
 * @export
 * @param amount - amount to convert with no or at most 2 decimal values
 * @return amount sub unit value
 *
 * @example
 * ```ts
 *  const amount = 1
 * 	const kobo = convertToSubUnit(amount) // 100
 * ```
 */
export function convertToSubUnit(amount: number): number {
	const [, decimalPart] = amount.toString().split(".");
	if (decimalPart?.length > 2)
		throw new Error(
			`"amount" value should not have more than 2 decimal values`,
		);
	// ? remove decimal to maintain sub unit value
	return amount * 100;
}

/**
 * Converts a sub unit value to main unit value.
 *
 * eg:
 * * `1` Nigerian Naira -> `100` Kobo
 * * `1` Ghanian Cedi -> `100` Pesewas
 * * `1` S.African Rand -> `100` Cent
 * * `1` US Dollar -> `100` Cent
 *
 * @export
 * @param amount - amount in sub unit with no decimal values
 * @return amount in main unit
 *
 * @example
 * ```ts
 *  const amount = 100
 * 	const naira = convertToMainUnit(amount) // 1
 * ```
 */
export function convertToMainUnit(amount: number): number {
	// ! zero value decimals (eg .00, 100.00 == 100) will be ignored
	if (amount.toString().includes("."))
		throw new Error(`"amount" value should not have decimal values`);
	return amount * 0.01;
}
