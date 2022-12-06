/* 
	This code for cloudflare service worker.
*/

addEventListener("fetch", event => {
	event.respondWith(handleRequest(event.request));
});

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET',
	'Access-Control-Max-Age': '86400',
	'Content-Type': 'application/json; charset=UTF-8'
};

async function handleRequest(request) {
	const origin = 'https://github.com';

	try {
		const { pathname, search } = new URL(request.url);

		const req = await fetch(`${origin}${pathname}${search}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'text/html; charset=utf-8'
			},
		});

		if (!req.ok) throw new Error('Data not found');

		const data = await req.text();

		return new Response({ ok: true, data }, {
			headers,
			status: 200
		});

	} catch (err) {
		return new Response({ ok: false, msg: err.message }, {
			headers,
			status: 404,
			statusText: err.message
		});
	}
}
