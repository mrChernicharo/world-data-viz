import { SyntheticEvent } from 'react';
import { IRegion } from '../../../lib/interfaces/IRegion';
import { RegionCardContainer } from './RegionCardContainer';

interface IRegionCardProps {
	region: IRegion;
	clicked: (region: IRegion) => void;
}

export default function RegionCard({ region, clicked }: IRegionCardProps) {
	function handleCardClick(e: SyntheticEvent) {
		clicked(region);
	}

	return (
		<RegionCardContainer onClick={handleCardClick}>
			{region.name}
		</RegionCardContainer>
	);
}
