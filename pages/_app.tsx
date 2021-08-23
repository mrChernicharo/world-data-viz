import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CountriesContextProvider } from '../store/CountriesContext';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<CountriesContextProvider>
			<Component {...pageProps} />
		</CountriesContextProvider>
	);
}
export default MyApp;
