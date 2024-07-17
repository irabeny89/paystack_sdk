import Paystack from "..";

describe("Paystack", () => {
	const SECRET = "secret";

	let paystack: Paystack;

	beforeEach(() => {
		paystack = new Paystack(SECRET);
	});

	it("should have Axios Paystack client defined", () => {
		expect(paystack.axiosPaystackClient).toBeDefined();
	});

	it("should have Paystack transaction object property defined", () => {
		expect(paystack.transaction).toBeDefined();
	});

	it("should have Paystack transfer recipient object property defined", () => {
		expect(paystack.transferRecipient).toBeDefined();
	});

	it("should have Paystack transfer object property defined", () => {
		expect(paystack.transfer).toBeDefined();
	});
});
