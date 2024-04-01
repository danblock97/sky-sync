import { useState } from "react";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
	const router = useRouter();
	const [city, setCity] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (city.trim()) {
			router.push(`/weather/${encodeURIComponent(city.trim())}`);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex items-center justify-center my-8"
		>
			<input
				type="text"
				value={city}
				onChange={(e) => setCity(e.target.value)}
				placeholder="Enter city name"
				className="py-2 px-4 mr-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
			/>
			<button
				type="submit"
				className="py-2 px-6 bg-blue-500 text-white rounded-r-md flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
			>
				<FiSearch className="mr-2" />
				<span>Search</span>
			</button>
		</form>
	);
}
