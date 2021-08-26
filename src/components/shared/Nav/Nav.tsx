import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import { FiGlobe } from 'react-icons/fi';
import { NavContainer } from './NavContainer';
import { NavLinks } from './NavLinks/NavLinks';

export default function Nav() {
	const router = useRouter();
	const [location, setLocation] = useState('/');

	useEffect(() => {
		setLocation(router.asPath);
		console.log(router.asPath);
	}, [router.asPath]);

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
