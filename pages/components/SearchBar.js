import { useRouter } from "next/router";

export default function SearchBar() {
	const router = useRouter();

	const handleSearch = async (e) => {
		e.preventDefault();
		const city = e.target.city.value;
		router.push(`/weather/${city}`);
	};

	return (
		<form onSubmit={handleSubmit} className="flex justify-center mt-10">
			<input
				name="city"
				type="text"
				placeholder="Enter City Name"
				className="input input-bordered input-primary w-full max-w-xs"
				required
			/>
			<button type="submit" className="btn btn-primary ml-2">
				Search
			</button>
		</form>
	);
}
