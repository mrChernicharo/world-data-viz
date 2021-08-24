import { ICountry } from '../../lib/interfaces/ICountry';
import { CountriesListContainer } from './CountriesListContainer';
import CountryCard from './CountryCard';

interface ICountriesListProps {
	countries: ICountry[];
	onSelect: (country: ICountry) => void;
}

export default function CountriesList({
	countries,
	onSelect,
}: ICountriesListProps) {
	function handleCountrySelected(country: ICountry) {
		onSelect(country);
		return country;
	}

	return (
		<CountriesListContainer>
			{countries.map(country => (
				<CountryCard
					key={country.alpha3Code}
					country={country}
					onCountryClicked={handleCountrySelected}
				/>
			))}
		</CountriesListContainer>
	);
}
