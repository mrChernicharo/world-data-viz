import { IRegion } from '../../../lib/interfaces/IRegion';
import { RegionListContainer } from './RegionListContainer';
import RegionCard from '../RegionCard/RegionCard';

interface IRegionsListProps {
	regions: IRegion[];
	onSelectRegion: (region: IRegion) => void;
}

export default function RegionList({
	regions,
	onSelectRegion,
}: IRegionsListProps) {
	function handleRegionClick(region: IRegion) {
		onSelectRegion(region);
	}

	return (
		<RegionListContainer>
			{regions.map(region => (
				<RegionCard
					key={region.wikiDataId}
					region={region}
					clicked={handleRegionClick}
				/>
			))}
		</RegionListContainer>
	);
}
