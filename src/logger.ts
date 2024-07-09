import pino, { stdTimeFunctions } from "pino";

export default function createLogger(name = "Paystack Node") {
	return pino({
		name,
		timestamp: stdTimeFunctions.isoTime,
		formatters: {
			level: (label) => ({
				level: label.toUpperCase(),
			}),
		},
	});
}
