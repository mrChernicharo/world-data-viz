import { useRouter } from 'next/dist/client/router';

export default function CityPage() {
	const router = useRouter();

	return (
		<div>
			<h1>City Page {router.query.city}</h1>
		</div>
	);
}
