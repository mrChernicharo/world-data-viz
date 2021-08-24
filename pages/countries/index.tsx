import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ICountry } from '../../interfaces/ICountry';
import { CountriesContext } from '../../store/CountriesContext';

export default function CountriesPage() {
	const context = useContext(CountriesContext);
	const router = useRouter();

	function handleCountrySelected(country: ICountry) {
		context.selectCountry(country.alpha3Code);
	}

	// console.log(router.replace());

	return (
		<div>
			<h1>All Countries Page</h1>

			<ul>
				{context.countries.map(country => (
					<li
						key={country.alpha3Code}
						onClick={() => handleCountrySelected(country)}
					>
						<p>{country.name}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
