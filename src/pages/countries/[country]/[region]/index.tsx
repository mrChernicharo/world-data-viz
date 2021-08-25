import { throttle } from 'lodash';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useContext } from 'react';
import {
	FaChevronLeft,
	FaChevronRight,
	FaUser,
	FaUserAlt,
} from 'react-icons/fa';
import { CountriesContext } from '../../../../store/CountriesContext';

const tOpts = {
	leading: false,
	trailing: true,
};

export default function RegionPage() {
	const [searchOffset, setSearchOffset] = useState(0);
	const [disableNext, setDisableNext] = useState(false);
	const [disablePrev, setDisablePrev] = useState(true);

	const router = useRouter();
	const { selectedRegion, cities, citiesInfo, fetchCities } =
		useContext(CountriesContext);

	const getMaxOffset = useCallback(() => {
		return citiesInfo?.metadata?.totalCount - 10 || 0;
	}, [citiesInfo?.metadata?.totalCount]);

	function handleOffsetIncrement(e: SyntheticEvent) {
		const maxOffset = getMaxOffset();
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

	const getCities = useCallback(
		(code, offset: number) => {
			return fetchCities(code, offset);
		},
		[fetchCities]
	);

	useEffect(() => {
		fetchCities(selectedRegion.isoCode);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const p = getCities(selectedRegion.isoCode, searchOffset);

		Promise.resolve(p)
			.then(() => {
				if (citiesInfo?.metadata?.totalCount) {
					const maxOffset = getMaxOffset();

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
			})
			.catch(() => console.log(p))
			.finally(() => console.log(p));

		return () => console.log('destroying', searchOffset);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchOffset]);

	return (
		<div>
			<h1>{router.query.region}</h1>

			<ul>
				{cities.map(city => (
					<li key={nanoid()}>
						<span>{city.name}</span>
						<FaUser />
						<span>{city.population}</span>
					</li>
				))}
			</ul>

			{!disablePrev && (
				<button onClick={throttle(handleOffsetDecrement, 500, tOpts)}>
					<span>
						<FaChevronLeft /> prev
					</span>
				</button>
			)}

			{!disableNext && (
				<button onClick={throttle(handleOffsetIncrement, 500, tOpts)}>
					<span>
						<FaChevronRight /> next
					</span>
				</button>
			)}
		</div>
	);
}
