import { ICountry } from '../../lib/interfaces/ICountry';
import { CountriesListContainer } from './CountriesListContainer';
import CountryCard from './CountryCard';

interface ICountriesListProps {
	countries: ICountry[];
}

export default function CountriesList({ countries }: ICountriesListProps) {
	return (
		<CountriesListContainer>
			{countries.map(country => (
				<CountryCard key={country.alpha3Code} country={country} />
			))}
		</CountriesListContainer>
	);
}
