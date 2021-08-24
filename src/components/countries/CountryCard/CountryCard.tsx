import { useRouter } from 'next/router';
import { parseCountryName } from '../../../lib/helpers/helperFns';
import { ICountry } from '../../../lib/interfaces/ICountry';
import { CountryCardContainer } from './CountryCardContainer';
import { FaUser } from 'react-icons/fa';

interface ICountryCardProps {
	country: ICountry;
	onCountryClicked: (country: ICountry) => ICountry;
}
export default function CountryCard({
	country,
	onCountryClicked,
}: ICountryCardProps) {
	const router = useRouter();
	const countryName = parseCountryName(country.name);

	function onCardClick(country: ICountry) {
		onCountryClicked(country);
	}

	return (
		<CountryCardContainer onClick={() => onCardClick(country)}>
			<div>
				<h2>{countryName}</h2>
				<p>
					<FaUser />
					{country.population}
				</p>
			</div>
		</CountryCardContainer>
	);
}
