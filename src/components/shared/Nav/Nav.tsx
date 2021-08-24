import { useRouter } from 'next/router';
import { useState } from 'react';
import { FiGlobe } from 'react-icons/fi';
import { NavContainer } from './NavContainer';
import { NavLinks } from './NavLinks/NavLinks';

export default function Nav() {
	const router = useRouter();
	const location = router.pathname;

	return (
		<NavContainer>
			<div>
				<FiGlobe size={30} />
			</div>
			<NavLinks location={location} />
		</NavContainer>
	);
}

interface INavProps {}
