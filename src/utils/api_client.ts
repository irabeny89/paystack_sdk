import { PAYSTACK_BASE_URL } from "../../config";
import type { ParamsT } from "../types/global";

const getData = async <T>(res: Response) => {
	if (res.ok) return res.json<T>();
	throw new Error(`${res.status}: ${res.statusText}`);
};

export const addParamsToUrl = (url: string, entry: unknown[], index: number) =>
	index === 0
		? `${url}?${entry[0]}=${entry[1]}`
		: `${url}&${entry[0]}=${entry[1]}`;

export const createUrl = (path: string, params?: ParamsT) => {
	let url = `${PAYSTACK_BASE_URL}${path}`;
	// ? handle path params first
	if (params?.path) url = `${url}${params.path}`;
	// ? then handle query params
	if (params?.query)
		url = Object.entries(params.query).reduce(addParamsToUrl, url);

	return url;
};

const createGet =
	(headers: Headers) =>
	async <R = unknown>(path: string, params?: ParamsT) => {
		return getData<R>(await fetch(createUrl(path, params), { headers }));
	};

const createPost =
	(headers: Headers) =>
	async <R = unknown, B = unknown>(path: string, body: B) => {
		return getData<R>(
			await fetch(`${PAYSTACK_BASE_URL}${path}`, {
				method: "POST",
				headers,
				body: JSON.stringify(body),
			}),
		);
	};

export default function createApiClient(paystackSecret: string) {
	const headers = new Headers({
		Authorization: `Bearer ${paystackSecret}`,
		"Content-Type": "application/json",
	});
	return {
		get: createGet(headers),
		post: createPost(headers),
	};
}
