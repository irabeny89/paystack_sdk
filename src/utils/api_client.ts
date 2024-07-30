import { PAYSTACK_BASE_URL } from "../../config";

export default function createApiClient(paystackSecret: string) {
	const authorization = `Bearer ${paystackSecret}`;
	return {
		get: async <T = unknown>(path: string) => {
			const url = `${PAYSTACK_BASE_URL}${path}`;
			const res = await fetch(url, {
				headers: { authorization },
			});

			if (res.ok) return res.json<T>();
			throw new Error(res.statusText);
		},
		// post: async <T = unknown>(path: string) => {
		//   const url = `${PAYSTACK_BASE_URL}/${path}`
		//   const res = await fetch({

		//   })
		// }
	};
}
