import { PAYSTACK_BASE_URL } from "../../config";
import type { ApiClientT, QueryT } from "../types/global";

const getData = async <T>(res: Response): Promise<T> => {
	if (res.ok) return res.json();
	throw new Error(`${res.status}: ${res.statusText}`);
};

export const addParamsToUrl = (url: string, entry: unknown[], index: number) =>
	index === 0
		? `${url}?${entry[0]}=${entry[1]}`
		: `${url}&${entry[0]}=${entry[1]}`;

export const createUrl = (uri: string, query?: QueryT) => {
	let url = `${PAYSTACK_BASE_URL}${uri}`;
	if (query) url = Object.entries(query).reduce(addParamsToUrl, url);

	return url;
};

const createGet =
	(headers: Headers) =>
	async <R = unknown>(uri: string, query?: QueryT) => {
		return getData<R>(await fetch(createUrl(uri, query), { headers }));
	};

const createPost =
	(headers: Headers) =>
	async <R = unknown, B = unknown>(uri: string, body: B) => {
		return getData<R>(
			await fetch(`${PAYSTACK_BASE_URL}${uri}`, {
				method: "POST",
				headers,
				body: JSON.stringify(body),
			}),
		);
	};

const createPut =
	(headers: Headers) =>
	async <R = unknown, B = unknown>(uri: string, body: B) => {
		return getData<R>(
			await fetch(`${PAYSTACK_BASE_URL}${uri}`, {
				method: "PUT",
				headers,
				body: JSON.stringify(body),
			}),
		);
	};

const createDelete =
	(headers: Headers) =>
	async <R = unknown>(uri: string) => {
		return getData<R>(await fetch(createUrl(uri), { headers }));
	};

export function createApiClient(paystackSecret: string): ApiClientT {
	const headers = new Headers({
		Authorization: `Bearer ${paystackSecret}`,
		"Content-Type": "application/json",
	});
	return {
		get: createGet(headers),
		post: createPost(headers),
		put: createPut(headers),
		delete: createDelete(headers),
	};
}
