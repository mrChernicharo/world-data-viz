import { useContext } from 'react';
import { CountriesContext } from '../../store/CountriesContext';

export default function CountriesPage() {
	const context = useContext(CountriesContext);

	console.log(context);

	return (
		<div>
			<h1>All Countries Page</h1>
		</div>
	);
}
