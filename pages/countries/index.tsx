import { useRouter } from 'next/router';
import { useContext } from 'react';
import CountriesList from '../../components/countries/CountriesList';
import CountryCard from '../../components/countries/CountryCard';
import { ICountry } from '../../lib/interfaces/ICountry';
import { CountriesContext } from '../../store/CountriesContext';

export default function CountriesPage() {
	const router = useRouter();

	const context = useContext(CountriesContext);

	function handleCountrySelected(country: ICountry) {
		context.selectCountry(country.alpha3Code);
	}

	// console.log(router.replace());

	return (
		<div>
			<h1>All Countries Page</h1>

			<CountriesList countries={context.countries} />
		</div>
	);
}
