export interface IRegion {
	countryCode: string;
	fipsCode: string;
	isoCode: string;
	name: string;
	wikiDataId: string;
}

export interface IAPILink {
	href: string;
	rel: string;
}

export interface IRegionResponse {
	data: IRegion[];
	links: IAPILink[];
	metadata: { currentOffset: number; totalCount: number };
}
