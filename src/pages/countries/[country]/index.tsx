import { useRouter } from 'next/router';
import { SyntheticEvent, useCallback, useContext, useEffect } from 'react';
import { CountriesContext } from '../../../store/CountriesContext';
import { nanoid } from 'nanoid';
import { FaUser } from 'react-icons/fa';
import { Alpha2Code } from '../../../lib/interfaces/ICountry';
import { useState } from 'react';
import { useRef } from 'react';
import { throttle } from 'lodash';

const tOpts = {
	leading: false,
	trailing: true,
};

export default function CountryPage() {
	const [searchOffset, setSearchOffset] = useState(0);
	const [disableNext, setDisableNext] = useState(false);
	const [disablePrev, setDisablePrev] = useState(true);

	const router = useRouter();
	const {
		selectedCountry,
		regions,
		regionsInfo,
		fetchRegions,
		selectCountry,
	} = useContext(CountriesContext);

	function handleOffsetIncrement(e: SyntheticEvent) {
		const maxOffset = regionsInfo.metadata.totalCount - 10;
		if (searchOffset < maxOffset) {
			setSearchOffset(searchOffset + 10);
		}
		if (searchOffset >= maxOffset) setDisableNext(false);
	}

	function handleOffsetDecrement(e: SyntheticEvent) {
		if (searchOffset > 9) {
			setSearchOffset(searchOffset - 10);
		}
	}

	const getRegions = useCallback(
		(code: Alpha2Code, offset: number) => {
			return fetchRegions(code, offset);
		},
		[fetchRegions]
	);

	useEffect(() => {
		getRegions(selectedCountry.alpha2Code, searchOffset);

		if (regionsInfo?.metadata?.totalCount) {
			const maxOffset = regionsInfo.metadata.totalCount - 10;

			if (searchOffset < 10) {
				setDisablePrev(true);
			} else {
				setDisablePrev(false);
			}
			if (searchOffset >= maxOffset) {
				setDisableNext(true);
			} else {
				setDisableNext(false);
			}
		}

		return () => console.log('destroying', searchOffset);
	}, [
		getRegions,
		regionsInfo.metadata.totalCount,
		searchOffset,
		selectedCountry.alpha2Code,
	]);

	useEffect(() => {
		if (!selectedCountry) {
			const countryCode = router.query.country;
			selectCountry(countryCode as Alpha2Code);
		}

		return () => {};
	}, [router.query.country, selectCountry, selectedCountry]);

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

					<button
						onClick={throttle(handleOffsetDecrement, 500, tOpts)}
						disabled={disablePrev}
					>
						prev
					</button>
					<button
						onClick={throttle(handleOffsetIncrement, 500, tOpts)}
						disabled={disableNext}
					>
						next
					</button>
				</li>
			</ul>
		</div>
	);
}
