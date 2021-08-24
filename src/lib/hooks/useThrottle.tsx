import { useMemo } from 'react';
import { useEffect, useState } from 'react';

export default function useDebounce(func: any, delay: number) {
	const [id, setId] = useState<any>(null);

	return useMemo(
		(...args) => {
			console.log('debouncing', id);
			if (id) {
				clearTimeout(id);
			} else {
				setId(
					setTimeout(() => {
						setId(null);
						func(...args);
					}, delay)
				);
			}
		},
		[delay, func, id]
	);
}
