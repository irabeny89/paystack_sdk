import { PAYSTACK_BASE_URL } from "../../config";
import type { QueryT } from "../types/global";

const getData = async <T>(res: Response) => {
	if (res.ok) return res.json<T>();
	throw new Error(`${res.status}: ${res.statusText}`);
};

export const addParamsToUrl = (url: string, entry: unknown[], index: number) =>
	index === 0
		? `${url}?${entry[0]}=${entry[1]}`
		: `${url}&${entry[0]}=${entry[1]}`;

export const createUrl = (path: string, query?: QueryT) => {
	let url = `${PAYSTACK_BASE_URL}${path}`;
	if (query) url = Object.entries(query).reduce(addParamsToUrl, url);

	return url;
};

const createGet =
	(headers: Headers) =>
	async <R = unknown>(path: string, query?: QueryT) => {
		return getData<R>(await fetch(createUrl(path, query), { headers }));
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
