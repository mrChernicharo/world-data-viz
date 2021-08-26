import { SyntheticEvent } from 'react';
import { ICity } from '../../../lib/interfaces/ICity';
import { CityCardContainer } from './CityCardContainer';

interface ICityCardProps {
	city: ICity;
	clicked: (City: ICity) => void;
}

export default function CityCard({ city, clicked }: ICityCardProps) {
	function handleCardClick(e: SyntheticEvent) {
		clicked(city);
	}

	return (
		<CityCardContainer onClick={handleCardClick}>
			{city.name}
		</CityCardContainer>
	);
}
