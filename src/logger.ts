import pino, { stdTimeFunctions } from "pino";

export default function createLogger(name = "Paystack Node") {
	return pino({
		name,
		base: undefined,
		timestamp: stdTimeFunctions.isoTime,
		formatters: {
			level: (label) => ({
				level: label.toUpperCase(),
			}),
		},
	});
}
