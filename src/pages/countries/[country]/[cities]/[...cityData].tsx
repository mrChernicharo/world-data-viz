import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';

export default function CityPage() {
	const router = useRouter();

	const citiesData = router.query.citiData;
	const citiesInfo = citiesData instanceof Array ? citiesData : [citiesData];

	return (
		<div>
			<h1>City Page</h1>

			<p>country: {router.query.country}</p>

			<ul>
				{citiesInfo.map(info => (
					<li key={nanoid()}>{info}</li>
				))}
			</ul>
		</div>
	);
}
