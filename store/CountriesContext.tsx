import {
	createContext,
	ReactChildren,
	ReactNode,
	useEffect,
	useState,
} from 'react';
import { Alpha3Code, ICountry } from '../lib/interfaces/ICountry';
import axios from 'axios';
import { IRegion, IRegionResponse } from '../lib/interfaces/IRegion';

interface ICountriesContextProps {
	children: JSX.Element[] | JSX.Element;
}

export const CountriesContext = createContext({
	countries: [] as ICountry[],
	selectedCountry: {} as ICountry,
	regions: [] as any[],
	selectedRegion: {} as IRegion,
	fetchCountries: () => {},
	selectCountry: (country: ICountry) => {},
	fetchRegions: () => {},
	selectRegion: (country: ICountry) => {},
});

export function CountriesContextProvider({ children }: ICountriesContextProps) {
	const [countries, setCountries] = useState<ICountry[]>([]);
	const [regions, setRegions] = useState<any[]>([]);
	const [selectedCountry, setSelectedCountry] = useState({} as ICountry);
	const [selectedRegion, setSelectedRegion] = useState('');

	async function fetchCountriesHandler() {
		const req = await fetch('https://restcountries.eu/rest/v2/all');

		const countriesData = await req.json();

		setCountries(countriesData);
	}

	async function fetchRegionsHandler(country: ICountry) {
		const [limit, offset] = [10, 0];
		const code = country.alpha2Code || 'BR';
		const baseUrl = 'https://wft-geo-db.p.rapidapi.com';
		const url = `${baseUrl}/v1/geo/countries/${code}/regions?limit=${limit}&offset=${offset}`;
		const headers = {
			'Access-Control-Allow-Origin': '*',
			'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
			'x-rapidapi-key':
				'1bf3597733msh05782a9f05f7575p18705bjsn541a5c8b37c8',
			// '488f64ab30msh34d823c2ab79491p132cfbjsn71c7a72c6386',
			// 'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
		};

		const req = await fetch(url, { headers });

		const response: IRegionResponse = await req.json();

		console.log(response.data);
	}

	function selectCountryHandler(country: ICountry) {
		setSelectedCountry(country);
	}

	function selectRegionHandler(region: any) {
		setSelectedRegion(region);
	}

	const context = {
		countries,
		selectedCountry,
		selectedRegion,
		selectCountry: selectCountryHandler,
		fetchCountries: fetchCountriesHandler,
		fetchRegions: fetchRegionsHandler,
		selectRegion: selectRegionHandler,
	};

	useEffect(() => {
		fetchCountriesHandler();
	}, []);

	useEffect(() => {
		fetchRegionsHandler(selectedCountry);
	}, [selectedCountry]);

	return (
		<CountriesContext.Provider value={context as any}>
			{children}
		</CountriesContext.Provider>
	);
}
