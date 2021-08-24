import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect } from 'react';
import { CountriesContext } from '../../../store/CountriesContext';
import { nanoid } from 'nanoid';
import { toArray } from '../../../lib/helpers/helperFns';
import { FaUser } from 'react-icons/fa';
import { Alpha2Code } from '../../../lib/interfaces/ICountry';

export default function CountryPage() {
	const router = useRouter();
	const { selectedCountry, regions, fetchRegions, selectCountry } =
		useContext(CountriesContext);

	const getRegions = useCallback(
		() => fetchRegions(selectedCountry.alpha2Code),
		[fetchRegions, selectedCountry]
	);

	useEffect(() => {
		if (!selectedCountry) {
			const countryCode = router.query.country;
			selectCountry(countryCode as Alpha2Code);
		}
	}, []);

	useEffect(() => {
		getRegions();
	}, []);

	return (
		<div>
			<h3>Country info</h3>
			<ul>
				<li>
					<p>{selectedCountry.name}</p>

					<ul>
						{selectedCountry.translations &&
							Object.values(selectedCountry.translations).map(
								trans => <li key={nanoid()}>{trans}</li>
							)}
					</ul>

					<p>
						<FaUser />
						{selectedCountry.population}
					</p>

					<ul>
						{regions &&
							regions.map(region => (
								<li key={region.wikiDataId}> {region.name}</li>
							))}
					</ul>
				</li>
			</ul>
		</div>
	);
}
