import { useRouter } from 'next/router';

// [...<name>] is a route that can have multiple params.
// If there's more than 1 param, an Array is found under router.query.<name>

export default function ErrorSlug() {
	const router = useRouter();

	const slug = router.query.slug;

	console.log(router.query);

	return (
		<div>
			<h1>
				Error Slug {slug instanceof Array ? slug.join(' - ') : slug}
			</h1>
		</div>
	);
}
