import { createContext, useEffect, useState } from 'react';
import { Alpha2Code, Alpha3Code, ICountry } from '../lib/interfaces/ICountry';
import axios from 'axios';
import {
	IRegion,
	IRegionResponse,
	IRegionsInfo,
} from '../lib/interfaces/IRegion';
import {
	defaultCities,
	defaultCountry,
	defaultRegions,
	geoDBHeaders,
} from '../lib/helpers/constants';
import { ICitiesInfo, ICity, ICityResponse } from '../lib/interfaces/ICity';
import { useInterval } from '../lib/hooks/useInterval';
import { useCallback } from 'react';

interface ICountriesContextProps {
	children: JSX.Element[] | JSX.Element;
}

export const CountriesContext = createContext({
	countries: [] as ICountry[],
	selectedCountry: {} as ICountry,
	regions: [] as IRegion[],
	regionsInfo: {} as IRegionsInfo,
	selectedRegion: {} as IRegion,
	cities: [] as ICity[],
	citiesInfo: {} as ICitiesInfo,
	selectedCity: {} as ICity,
	isAppleM1: false,
	fetchCountries: () => {},
	selectCountry: (code: Alpha2Code) => {},
	fetchRegions: (code?: Alpha2Code, offset?: number) => Promise,
	selectRegion: (region: IRegion) => {},
	fetchCities: (regionCode: string, offset?: number) => {},
	selectCity: (city: ICity) => {},
});

export function CountriesContextProvider({ children }: ICountriesContextProps) {
	const [countries, setCountries] = useState<ICountry[]>([]);
	const [regions, setRegions] = useState<any[]>([]);
	const [cities, setCities] = useState<any[]>([]);
	const [regionsInfo, setRegionsInfo] = useState({});
	const [citiesInfo, setCitiesInfo] = useState({});
	const [selectedCountry, setSelectedCountry] = useState({} as ICountry);
	const [selectedRegion, setSelectedRegion] = useState({} as IRegion);
	const [selectedCity, setSelectedCity] = useState({} as ICity);

	const context = {
		countries,
		regions,
		regionsInfo,
		cities,
		citiesInfo,
		selectedCountry,
		selectedRegion,
		selectedCity,
		isAppleM1: process.arch === 'arm64' && process.platform === 'darwin', // bug fix pro M1,
		selectCountry: selectCountryHandler,
		fetchCountries: fetchCountriesHandler,
		fetchRegions: fetchRegionsHandler,
		selectRegion: selectRegionHandler,
		fetchCities: fetchCitiesHandler,
		selectCity: selectCityHandler,
	};

	async function fetchCountriesHandler() {
		const req = await fetch('https://restcountries.eu/rest/v2/all');

		const countriesData = await req.json();

		console.log(countriesData);

		setCountries(countriesData);
	}

	async function fetchRegionsHandler(code: Alpha2Code = 'US', offset = 0) {
		const limit = 10;
		const baseUrl = 'https://wft-geo-db.p.rapidapi.com';

		const url = `${baseUrl}/v1/geo/countries/${code}/regions?limit=${limit}&offset=${offset}`;

		const req = await fetch(url, { headers: geoDBHeaders });

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

	async function fetchCitiesHandler(regionCode: string, offset = 0) {
		const limit = 10;
		const baseUrl = 'https://wft-geo-db.p.rapidapi.com';

		const url = `${baseUrl}/v1/geo/countries/${selectedCountry.alpha2Code}/regions/${regionCode}/cities?limit=${limit}&offset=${offset}&sort=-population,name`;

		const req = await fetch(url, { headers: geoDBHeaders });

		try {
			if (!req.ok) {
				throw new Error(req.statusText);
			}

			const response: ICityResponse = await req.json();

			console.log(response);
			setCitiesInfo({
				links: response.links,
				metadata: response.metadata,
			});

			setCities(response.data);
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

	function selectRegionHandler(region: IRegion) {
		setSelectedRegion(region);
	}

	function selectCityHandler(city: ICity) {
		setSelectedCity(city);
	}

	function storeContext(contextData: any) {
		window.localStorage.setItem('context', JSON.stringify(contextData));
	}

	function hydrateContext() {
		try {
			const contextRaw = window.localStorage.getItem('context') as string;
			const contextData = JSON.parse(contextRaw);
			const {
				selectedCity,
				selectedRegion,
				selectedCountry,
				cities,
				citiesInfo,
				regions,
				regionsInfo,
			} = contextData;
			selectCityHandler(selectedCity);
			selectRegionHandler(selectedRegion);
			selectCountryHandler(selectedCountry.alpha2Code);
			setRegions(regions);
			setCities(cities);
			setRegionsInfo(regionsInfo);
			setCitiesInfo(citiesInfo);
		} catch (err) {
			console.warn(err);
		} finally {
			console.log('hydrated store');
		}
	}

	const storeCb = useCallback(() => {
		const {
			selectedCity,
			selectedRegion,
			selectedCountry,
			cities,
			citiesInfo,
			regions,
			regionsInfo,
		} = context;

		storeContext({
			selectedCity,
			selectedRegion,
			selectedCountry,
			cities,
			citiesInfo,
			regions,
			regionsInfo,
		});
	}, [context]);

	useInterval(storeCb, 8000);

	useEffect(() => {}, []);

	useEffect(() => {
		if (window) {
			hydrateContext();
		} else {
			setSelectedCountry(defaultCountry);
			setRegions(defaultRegions);
			setCities(defaultCities);
			setRegionsInfo(regionsInfo);
			setCitiesInfo(citiesInfo);
			// selectRegionHandler(defaultRegions[0]);
			// selectCityHandler(defaultCities[0]);
		}
	}, []);

	useEffect(() => {}, []);

	useEffect(() => {
		fetchCountriesHandler();
		fetchRegionsHandler();
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
