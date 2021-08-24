import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CountriesContext } from '../../../../store/CountriesContext';

export default function CitiesPage() {
	const context = useContext(CountriesContext);

	return (
		<div>
			<h1>Cities Page</h1>
		</div>
	);
}
