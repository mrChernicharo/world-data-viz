import { createContext, useEffect, useState } from 'react';
import { Alpha2Code, Alpha3Code, ICountry } from '../lib/interfaces/ICountry';
import axios from 'axios';
import {
	IRegion,
	IRegionResponse,
	IRegionsInfo,
} from '../lib/interfaces/IRegion';
import { defaultCountry, defaultRegions } from '../lib/helpers/constants';

interface ICountriesContextProps {
	children: JSX.Element[] | JSX.Element;
}

export const CountriesContext = createContext({
	countries: [] as ICountry[],
	selectedCountry: {} as ICountry,
	regions: [] as IRegion[],
	regionsInfo: {} as IRegionsInfo,
	selectedRegion: {} as IRegion,
	isAppleM1: false,
	fetchCountries: () => {},
	selectCountry: (code: Alpha2Code) => {},
	fetchRegions: (code?: Alpha2Code, offset?: number) => Promise,
	selectRegion: (country: ICountry) => {},
});

export function CountriesContextProvider({ children }: ICountriesContextProps) {
	const [countries, setCountries] = useState<ICountry[]>([]);
	const [regions, setRegions] = useState<any[]>([]);
	const [regionsInfo, setRegionsInfo] = useState({});
	const [selectedCountry, setSelectedCountry] = useState({} as ICountry);
	const [selectedRegion, setSelectedRegion] = useState({} as IRegion);

	async function fetchCountriesHandler() {
		const req = await fetch('https://restcountries.eu/rest/v2/all');

		const countriesData = await req.json();

		console.log(countriesData);

		setCountries(countriesData);
	}

	async function fetchRegionsHandler(code: Alpha2Code = 'US', offset = 0) {
		const limit = 10;
		const baseUrl = 'https://wft-geo-db.p.rapidapi.com';
		const headers = {
			'Access-Control-Allow-Origin': '*',
			'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
			'x-rapidapi-key':
				'1bf3597733msh05782a9f05f7575p18705bjsn541a5c8b37c8',
		};

		const url = `${baseUrl}/v1/geo/countries/${code}/regions?limit=${limit}&offset=${offset}`;

		const req = await fetch(url, { headers });

		try {
			if (!req.ok) {
				throw new Error(req.statusText);
			}

			const response: IRegionResponse = await req.json();

			setRegionsInfo({
				links: response.links,
				metadata: response.metadata,
			});

			setRegions(response.data);
			//
		} catch (err) {
			console.warn(err);
		} finally {
			return req.status;
		}
	}

	function selectCountryHandler(code: Alpha2Code) {
		const country = countries.find(c => c.alpha2Code === code) as ICountry;
		setSelectedCountry(country);
	}

	function selectRegionHandler(region: any) {
		setSelectedRegion(region);
	}

	const context = {
		countries,
		regions,
		regionsInfo,
		selectedCountry,
		selectedRegion,
		isAppleM1: process.arch === 'arm64' && process.platform === 'darwin', // bug fix pro M1,
		selectCountry: selectCountryHandler,
		fetchCountries: fetchCountriesHandler,
		fetchRegions: fetchRegionsHandler,
		selectRegion: selectRegionHandler,
	};

	useEffect(() => {
		fetchCountriesHandler();
	}, []);

	useEffect(() => {
		setSelectedCountry(defaultCountry);
	}, []);

	useEffect(() => {
		setRegions(defaultRegions);
	}, []);

	// useEffect(() => {
	// 	console.log('fetching regions');
	// 	fetchRegionsHandler(selectedCountry);
	// }, [selectedCountry]);

	return (
		<CountriesContext.Provider value={context as any}>
			{children}
		</CountriesContext.Provider>
	);
}
