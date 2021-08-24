export function parseCountryName(name: string) {
	const parsed = name.replace(/[\s][(][a-zA-Z|\s|']+[)]/g, '');

	return parsed;
}

export function toArray(data: string | number | string[] | number[] | Object) {
	if (data instanceof Array) {
		return data;
	}
	if (data instanceof Object) {
		return Object.entries(data).map(([k, v]) => `${k} : ${v}`);
	} else {
		return data;
	}
}
