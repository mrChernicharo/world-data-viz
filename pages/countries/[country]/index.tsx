import { useRouter } from 'next/router';

export default function CountryPage() {
	const router = useRouter();

	return (
		<div>
			<h1>Country Page {router.query.country}</h1>
		</div>
	);
}
