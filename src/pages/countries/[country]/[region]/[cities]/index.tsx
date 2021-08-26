import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CountriesContext } from '../../../../../store/CountriesContext';

export default function CitiesPage() {
	const context = useContext(CountriesContext);
	return (
		<div>
			<h1>City Page</h1>

			<h2>{context.selectedCity.city}</h2>
		</div>
	);
}
