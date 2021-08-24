export function parseCountryName(name: string) {
	const parsed = name.replace(/[\s][(][a-zA-Z|\s|']+[)]/g, '');

	return parsed;

	// return name;
}
