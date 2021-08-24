import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { CountriesContextProvider } from '../store/CountriesContext';
import Nav from '../components/shared/Nav/Nav';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>World-data-viz</title>
			</Head>
			<CountriesContextProvider>
				<Nav />

				<Component {...pageProps} />
			</CountriesContextProvider>
		</>
	);
}
export default MyApp;
