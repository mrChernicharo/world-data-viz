import { createContext, ReactChildren, useEffect, useState } from 'react';
import { Alpha3Code, ICountry } from '../interfaces/ICountry';

interface ICountriesContextProps {
	children: ReactChildren;
	countries: ICountry[];
}

export const CountriesContext = createContext({
	countries: [] as ICountry[],
	selectedCountry: null,
	selectCountry: (code: Alpha3Code) => {},
	fetchCountries: () => {},
});

export function CountriesContextProvider({ children }: ICountriesContextProps) {
	const [countries, setCountries] = useState<ICountry[]>([]);
	const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(
		null
	);

	async function fetchCountriesHandler() {
		const req = await fetch('https://restcountries.eu/rest/v2/all');

		const countriesData = await req.json();

		setCountries(countriesData);
	}

	function selectCountryHandler(code: Alpha3Code) {
		const selected = countries.find(c => c.alpha3Code === code) as ICountry;

		if (selected) {
			setSelectedCountry(selected);
		}
	}

	// useEffect(() => {},[])

	const context = {
		countries,
		selectedCountry: null,
		selectCountry: selectCountryHandler,
		fetchCountries: fetchCountriesHandler,
	};

	return (
		<CountriesContext.Provider value={context}>
			{children}
		</CountriesContext.Provider>
	);
}
