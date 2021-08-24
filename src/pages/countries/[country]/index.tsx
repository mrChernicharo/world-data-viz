import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { CountriesContext } from '../../../store/CountriesContext';
import { nanoid } from 'nanoid';
import { toArray } from '../../../lib/helpers/helperFns';
import { FaUser } from 'react-icons/fa';

export default function CountryPage() {
	const router = useRouter();
	const { selectedCountry } = useContext(CountriesContext);

	useEffect(() => {
		// pegar cidades do país
		// pegar regiões do país
	}, []);

	return (
		<div>
			<h3>Country info</h3>
			<ul>
				<li>
					<p>{selectedCountry.name}</p>

					<ul>
						{Object.values(selectedCountry.translations).map(
							trans => (
								<li key={nanoid()}>{trans}</li>
							)
						)}
					</ul>

					<p>
						<FaUser />
						{selectedCountry.population}
					</p>
				</li>
			</ul>
		</div>
	);
}
