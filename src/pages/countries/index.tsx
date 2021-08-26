import { useRouter } from 'next/router';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import CountriesList from '../../components/countries/CountriesList/CountriesList';
import CountryCard from '../../components/countries/CountryCard/CountryCard';
import { toArray } from '../../lib/helpers/helperFns';
import { ICountry } from '../../lib/interfaces/ICountry';
import { CountriesContext } from '../../store/CountriesContext';

export default function CountriesPage() {
	const router = useRouter();
	const context = useContext(CountriesContext);
	const [filteredCountries, setFilteredCountries] = useState(
		context.countries
	);

	function navigateToCountry(country: ICountry) {
		const path = `/countries/${country.alpha2Code}`;

		router.push(path);

		context.selectCountry(country.alpha2Code);
	}

	function handleInputChange(e: SyntheticEvent) {
		const inputVal = (e.target as any).value as string;

		if (!inputVal) return;

		// console.log(e, inputVal);
		let filter = context.countries.filter(c =>
			[
				c.name.toLowerCase(),
				c.nativeName.toLowerCase(),
				c.alpha2Code.toLowerCase(),
				c.alpha3Code.toLowerCase(),
				...toArray(c.translations).map(v => String(v).toLowerCase()),
			].includes(inputVal.toLowerCase())
		);

		if (!filter.length) {
			filter = context.countries;
		}
		setFilteredCountries(filter);
	}

	return (
		<div>
			<h1>All Countries Page</h1>

			<label htmlFor="countries-search">
				<span>Country search</span>
				<FiSearch />
			</label>
			<input
				type="text"
				name="countries-search"
				onChange={handleInputChange}
			/>

			<CountriesList
				countries={filteredCountries}
				onSelect={navigateToCountry}
			/>
		</div>
	);
}
