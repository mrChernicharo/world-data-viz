import { useEffect } from 'react';

export default function Home() {
	return (
		<div>
			<h1>World Data Viz</h1>
		</div>
	);
}

// useEffect(() => {
// 	async function fetchCities() {
// 		// https://wft-geo-db.p.rapidapi.com
// 		const req = await fetch(
// 			'http://geodb-free-service.wirefreethought.com'
// 		);

// 		const cities = await req.json();

// 		console.log(cities);
// 	}
// });
