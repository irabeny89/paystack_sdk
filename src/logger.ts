import pino, { stdTimeFunctions } from "pino";

const logger = pino({
	name: "Paystack Node",
	timestamp: stdTimeFunctions.isoTime,
	formatters: {
		level: label => ({
			level: label.toUpperCase(),
		}),
	},
});

export default logger;
