import { useRouter } from 'next/router';

export default function RegionPage() {
	const router = useRouter();
	return (
		<div>
			<h1>Region Page {'-> ' + router.query.region}</h1>
		</div>
	);
}
