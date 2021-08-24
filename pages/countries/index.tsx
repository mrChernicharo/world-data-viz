import { useRouter } from 'next/router';
import { useContext } from 'react';
import CountriesList from '../../components/countries/CountriesList';
import CountryCard from '../../components/countries/CountryCard';
import { ICountry } from '../../lib/interfaces/ICountry';
import { CountriesContext } from '../../store/CountriesContext';

export default function CountriesPage() {
	const router = useRouter();

	const context = useContext(CountriesContext);

	// console.log(router.replace());
	function navigateToCountry(country: ICountry) {
		const path = `/countries/${country.name}`;

		router.push(path);

		context.selectCountry(country);
	}

	return (
		<div>
			<h1>All Countries Page</h1>

			<CountriesList
				countries={context.countries}
				onSelect={navigateToCountry}
			/>
		</div>
	);
}
