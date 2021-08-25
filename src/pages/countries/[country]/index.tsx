import {
	SyntheticEvent,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { FaChevronLeft, FaChevronRight, FaUser } from 'react-icons/fa';

import { useRouter } from 'next/router';
import Image from 'next/image';

import { throttle } from 'lodash';
import { nanoid } from 'nanoid';

import { CountriesContext } from '../../../store/CountriesContext';

import { Alpha2Code } from '../../../lib/interfaces/ICountry';
import { IRegion } from '../../../lib/interfaces/IRegion';

import RegionList from '../../../components/regions/RegionList/RegionList';

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

	const getRegions = useCallback(
		(code: Alpha2Code, offset: number) => {
			return fetchRegions(code, offset);
		},
		[fetchRegions]
	);

	const getMaxOffset = useCallback(() => {
		return regionsInfo.metadata.totalCount - 10;
	}, [regionsInfo?.metadata?.totalCount]);

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

	function handleNavigateToRegion(region: IRegion) {
		const path = router.pathname;

		router.push(`${path}/${region.name}`);
	}

	useEffect(() => {
		const p = getRegions(selectedCountry.alpha2Code, searchOffset);

		Promise.resolve(p)
			.then(() => {
				if (regionsInfo?.metadata?.totalCount) {
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

			<p>{selectedCountry.name}</p>

			{selectedCountry.flag && (
				<Image
					src={selectedCountry.flag}
					width={100}
					height={50}
					alt={'flag'}
				/>
			)}
			<ul>
				{selectedCountry.translations &&
					Object.values(selectedCountry.translations).map(trans => (
						<li key={nanoid()}>{trans}</li>
					))}
			</ul>

			<p>
				<FaUser />
				{selectedCountry.population}
			</p>

			<RegionList
				regions={regions}
				onSelectRegion={handleNavigateToRegion}
			/>

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
