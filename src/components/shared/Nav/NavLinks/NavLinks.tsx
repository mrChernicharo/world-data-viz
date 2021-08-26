import React from 'react';
import Link from 'next/link';
import { NavLinksContainer } from './NavLinksContainer';
import { useContext } from 'react';
import { CountriesContext } from '../../../../store/CountriesContext';
import {
	citiesPath,
	defaultCity,
	defaultRegion,
	regionsPath,
} from '../../../../lib/helpers/constants';

interface NavLinkProps {
	location: string;
}

export const NavLinks = ({ location }: NavLinkProps) => {
	const context = useContext(CountriesContext);

	return (
		<NavLinksContainer>
			<Link href="/">
				<a className={location === '/' ? 'active' : ''}>Home</a>
			</Link>
			<Link href="/countries">
				<a className={location === '/countries' ? 'active' : ''}>
					Countries
				</a>
			</Link>
			<Link href={regionsPath(context.selectedRegion.isoCode)}>
				<a className={'regions'.includes(location) ? 'active' : ''}>
					Regions
				</a>
			</Link>
			<Link
				href={citiesPath(
					context.selectedRegion.isoCode,
					context.selectedCity.name
				)}
			>
				<a className={'regions'.includes(location) ? 'active' : ''}>
					Cities
				</a>
			</Link>
			<Link href="/about">
				<a className={location === '/about' ? 'active' : ''}>About</a>
			</Link>
			{/* <Link href="/contact">
                <a className={location === '/contact' ? 'active' : ''}>Contact</a> 
                </Link>
            */}
		</NavLinksContainer>
	);
};
