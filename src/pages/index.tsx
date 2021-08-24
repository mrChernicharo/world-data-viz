import { useEffect } from 'react';
import Nav from '../components/shared/Nav/Nav';
import { HomeContainer } from './HomeContainer';
import Hero from '../components/shared/Hero/Hero';
import { useContext } from 'react';
import { CountriesContext } from '../store/CountriesContext';

export default function Home() {
	const { isAppleM1 } = useContext(CountriesContext);
	return (
		<HomeContainer>
			<h1>World Data Viz</h1>

			<Hero isAppleM1 />
		</HomeContainer>
	);
}
