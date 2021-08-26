import { ICitiesInfo, ICity } from '../interfaces/ICity';
import { ICountry } from '../interfaces/ICountry';
import { IRegion, IRegionsInfo } from '../interfaces/IRegion';

export const geoDBHeaders = {
	// 'Access-Control-Allow-Origin': '*',
	// 'content-type': 'application/json',
	'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
	'x-rapidapi-key': '1bf3597733msh05782a9f05f7575p18705bjsn541a5c8b37c8',
};

export const defaultCountry: ICountry = {
	alpha2Code: 'US',
	alpha3Code: 'USA',
	altSpellings: ['US', 'USA', 'United States of America'],
	area: 9629091,
	borders: ['CAN', 'MEX'],
	callingCodes: ['1'],
	capital: 'Washington, D.C.',
	cioc: 'USA',
	currencies: [{ code: 'USD', name: 'United States dollar', symbol: '$' }],
	demonym: 'American',
	flag: 'https://restcountries.eu/data/usa.svg',
	gini: 48,
	languages: [
		{
			iso639_1: 'en',
			iso639_2: 'eng',
			name: 'English',
			nativeName: 'English',
		},
	],

	latlng: [38, -97],
	name: 'United States of America',
	nativeName: 'United States',
	numericCode: '840',
	population: 323947000,
	region: 'Americas',
	regionalBlocs: [
		{
			acronym: 'NAFTA',
			name: 'North American Free Trade Agreement',
			otherAcronyms: [],
			otherNames: [
				'Tratado de Libre Comercio de América del Norte',
				'Accord de Libre-échange Nord-Américain',
			],
		},
	],
	subregion: 'Northern America',
	timezones: [
		'UTC-12:00',
		'UTC-11:00',
		'UTC-10:00',
		'UTC-09:00',
		'UTC-08:00',
		'UTC-07:00',
		'UTC-06:00',
		'UTC-05:00',
		'UTC-04:00',
		'UTC+10:00',
		'UTC+12:00',
	],
	topLevelDomain: ['.us'],
	translations: {
		br: 'Estados Unidos',
		de: 'Vereinigte Staaten von Amerika',
		es: 'Estados Unidos',
		fa: 'ایالات متحده آمریکا',
		fr: 'États-Unis',
		hr: 'Sjedinjene Američke Države',
		it: "Stati Uniti D'America",
		ja: 'アメリカ合衆国',
		nl: 'Verenigde Staten',
	},
};

export const defaultRegions: IRegion[] = [
	{
		countryCode: 'US',
		fipsCode: '01',
		isoCode: 'AL',
		name: 'Alabama',
		wikiDataId: 'Q173',
	},
	{
		countryCode: 'US',
		fipsCode: '02',
		isoCode: 'AK',
		name: 'Alaska',
		wikiDataId: 'Q797',
	},
	{
		countryCode: 'US',
		fipsCode: 'AQ',
		isoCode: 'AS',
		name: 'American Samoa',
		wikiDataId: 'Q16641',
	},
	{
		countryCode: 'US',
		fipsCode: '04',
		isoCode: 'AZ',
		name: 'Arizona',
		wikiDataId: 'Q816',
	},
	{
		countryCode: 'US',
		fipsCode: '05',
		isoCode: 'AR',
		name: 'Arkansas',
		wikiDataId: 'Q1612',
	},
	{
		countryCode: 'US',
		fipsCode: '06',
		isoCode: 'CA',
		name: 'California',
		wikiDataId: 'Q99',
	},
	{
		countryCode: 'US',
		fipsCode: '08',
		isoCode: 'CO',
		name: 'Colorado',
		wikiDataId: 'Q1261',
	},
	{
		countryCode: 'US',
		fipsCode: '09',
		isoCode: 'CT',
		name: 'Connecticut',
		wikiDataId: 'Q779',
	},
	{
		countryCode: 'US',
		fipsCode: '10',
		isoCode: 'DE',
		name: 'Delaware',
		wikiDataId: 'Q1393',
	},
	{
		countryCode: 'US',
		fipsCode: '11',
		isoCode: 'DC',
		name: 'District of Columbia',
		wikiDataId: 'Q3551781',
	},
];

export const defaultCities: ICity[] = [
	{
		city: 'Washington, D.C.',
		id: 113920,
		latitude: 38.89511,
		longitude: -77.03637,
		name: 'Washington, D.C.',
		population: 705749,
		type: 'CITY',
		wikiDataId: 'Q61',
	},
	{
		city: 'Columbia Heights',
		id: 3030645,
		latitude: 38.925,
		longitude: -77.03,
		name: 'Columbia Heights',
		population: 31696,
		type: 'CITY',
		wikiDataId: 'Q5149710',
	},
	{
		city: 'Georgetown',
		id: 3056391,
		latitude: 38.904722222,
		longitude: -77.0625,
		name: 'Georgetown',
		population: 25621,
		type: 'CITY',
		wikiDataId: 'Q1468648',
	},
	{
		city: 'Southwest',
		id: 3182230,
		latitude: 38.881111111,
		longitude: -77.016388888,
		name: 'Southwest',
		population: 23000,
		type: 'CITY',
		wikiDataId: 'Q88221439',
	},
	{
		city: 'Shaw',
		id: 113357,
		latitude: 38.9120559,
		longitude: -77.0213654,
		name: 'Shaw',
		population: 17639,
		type: 'CITY',
		wikiDataId: 'Q2277455',
	},
	{
		city: 'Adams Morgan',
		id: 113393,
		latitude: 38.922611111,
		longitude: -77.042661111,
		name: 'Adams Morgan',
		population: 15830,
		type: 'CITY',
		wikiDataId: 'Q2057409',
	},
	{
		city: 'Chevy Chase',
		id: 114036,
		latitude: 38.963888888,
		longitude: -77.067777777,
		name: 'Chevy Chase',
		population: 9545,
		type: 'CITY',
		wikiDataId: 'Q4404091',
	},
	{
		city: 'Washington Highlands',
		id: 3023897,
		latitude: 38.832055555,
		longitude: -76.994694444,
		name: 'Washington Highlands',
		population: 8829,
		type: 'CITY',
		wikiDataId: 'Q7971932',
	},
	{
		city: 'Bloomingdale',
		id: 113717,
		latitude: 38.9164,
		longitude: -77.0114,
		name: 'Bloomingdale',
		population: 4980,
		type: 'CITY',
		wikiDataId: 'Q4928307',
	},
	{
		city: 'Park View',
		id: 3033793,
		latitude: 38.9348,
		longitude: -77.0212,
		name: 'Park View',
		population: 4913,
		type: 'CITY',
		wikiDataId: 'Q7138122',
	},
];

export const defaultRegion: IRegion = {
	countryCode: 'US',
	fipsCode: '11',
	isoCode: 'DC',
	name: 'District of Columbia',
	wikiDataId: 'Q3551781',
};

export const defaultCity: ICity = {
	city: 'Washington, D.C.',
	id: 113920,
	latitude: 38.89511,
	longitude: -77.03637,
	name: 'Washington, D.C.',
	population: 705749,
	type: 'CITY',
	wikiDataId: 'Q61',
};

export const defaultRegionInfo: IRegionsInfo = {
	links: [
		{
			rel: 'first',
			href: '/v1/geo/countries/US/regions?offset=0&limit=10',
		},
		{
			rel: 'next',
			href: '/v1/geo/countries/US/regions?offset=10&limit=10',
		},
		{
			rel: 'last',
			href: '/v1/geo/countries/US/regions?offset=50&limit=10',
		},
	],
	metadata: { currentOffset: 0, totalCount: 56 },
};

export const defaultCitiesInfo: ICitiesInfo = {
	links: [
		{
			rel: 'first',
			href: '/v1/geo/countries/US/regions/DC/cities?offset=0&limit=10&sort=-population,name',
		},
		{
			rel: 'next',
			href: '/v1/geo/countries/US/regions/DC/cities?offset=10&limit=10&sort=-population,name',
		},
		{
			rel: 'last',
			href: '/v1/geo/countries/US/regions/DC/cities?offset=90&limit=10&sort=-population,name',
		},
	],
	metadata: { currentOffset: 0, totalCount: 95 },
};

export const regionsPath = (isoCode: string) =>
	`/countries/${isoCode || defaultRegion.isoCode}`;

export const citiesPath = (regionIsoCode: string, cityName: string) => {
	const regionCode = regionIsoCode || defaultRegion.isoCode;
	const city = cityName || defaultCity.name;

	return `/countries/${regionCode}/${city}`;
};

export const cityPath = (regionIsoCode: string, cityName: string) => {
	const regionCode = regionIsoCode || defaultRegion.isoCode;
	const city = cityName || defaultCity.name;

	return `/countries/${regionCode}/cities/${city}`;
};
