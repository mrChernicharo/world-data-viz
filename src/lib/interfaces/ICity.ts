import { IAPILink } from './IRegion';

export interface ICity {
	city: string;
	id: number;
	latitude: number;
	longitude: number;
	name: string;
	population: number;
	type: string;
	wikiDataId: string;
}
export interface ICityResponse {
	data: ICity[];
	links: IAPILink[];
	metadata: { currentOffset: number; totalCount: number };
}

export interface ICitiesInfo {
	links: IAPILink[];
	metadata: { currentOffset: number; totalCount: number };
}
