import { useRouter } from 'next/router';

export default function CityPage() {
	const router = useRouter();

	return (
		<div>
			<h1>City Page</h1>

			<p>country: {router.query.country}</p>
			<p>city: {router.query.cityData}</p>
		</div>
	);
}
