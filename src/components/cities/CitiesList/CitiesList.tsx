import { ICity } from '../../../lib/interfaces/ICity';
import { CitiesListContainer } from './CitiesListContainer';
import CityCard from '../CityCard/CityCard';

interface ICitiesListProps {
	cities: ICity[];
	onSelectCity: (city: ICity) => void;
}

export default function CitiesList({ cities, onSelectCity }: ICitiesListProps) {
	function handleCityClick(City: ICity) {
		onSelectCity(City);
	}

	return (
		<CitiesListContainer>
			{cities.map(city => (
				<CityCard
					key={city.wikiDataId}
					city={city}
					clicked={handleCityClick}
				/>
			))}
		</CitiesListContainer>
	);
}
