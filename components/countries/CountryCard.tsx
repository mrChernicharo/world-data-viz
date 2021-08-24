import { useRouter } from 'next/router';
import { parseCountryName } from '../../lib/helpers/helperFns';
import { ICountry } from '../../lib/interfaces/ICountry';
import Card from '../shared/Card/Card';

interface ICountryCardProps {
	country: ICountry;
}
export default function CountryCard({ country }: ICountryCardProps) {
	const router = useRouter();
	const countryName = parseCountryName(country.name);

	function navigateToCountry() {
		const path = `/countries/${countryName}`;

		router.push(path);
	}

	return (
		<Card>
			<div onClick={navigateToCountry}>
				<h2>{countryName}</h2>
				<p>{country.population}</p>
			</div>
		</Card>
	);
}
