/**
 * Converts an amount to it's sub unit. This is useful because Paystack expects amounts to be in sub units for their supported currencies.
 *
 * eg:
 * * `1` Nigerian Naira -> `100` Kobo
 * * `1` Ghanian Cedi -> `100` Pesewas
 * * `1` S.African Rand -> `100` Cent
 *
 * @export
 * @param {number} amount - amount to convert
 * @return {number} amount sub unit value
 *
 * @example
 * ```ts
 * 	const kobo = convertToSubUnit(1) // 100
 * ```
 */
export function convertToSubUnit(amount: number): number {
	return amount * 100;
}

/**
 * Converts a sub unit value to main unit value.
 *
 * eg:
 * * `1` Nigerian Naira -> `100` Kobo
 * * `1` Ghanian Cedi -> `100` Pesewas
 * * `1` S.African Rand -> `100` Cent
 *
 * @export
 * @param {number} amountInSubUnit - amount in sub unit
 * @return {number} amount in main unit
 *
 * @example
 * ```ts
 * 	const naira = convertToSubUnit(100) // 1
 * ```
 */
export function convertToMainUnit(amountInSubUnit: number): number {
	return amountInSubUnit * 0.01;
}
