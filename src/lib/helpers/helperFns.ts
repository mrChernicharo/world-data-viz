export function parseCountryName(name: string) {
	const parsed = name.replace(/[\s][(][a-zA-Z|\s|']+[)]/g, '');

	return parsed;
}

export function toArray(data: string | number | string[] | number[] | Object) {
	if (data instanceof Array) {
		return data;
	}
	if (data instanceof Object) {
		return Object.entries(data).map(([k, v]) => `${v}`);
	} else {
		return [data];
	}
}

export function throttle(fn: any, delay: number) {
	console.log(arguments);
	let elapsed = 0;
	const now = new Date().getTime();

	if (now - elapsed < delay) return;

	elapsed = now;

	return fn();
}
