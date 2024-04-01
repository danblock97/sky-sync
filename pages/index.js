import SearchBar from "./components/SearchBar";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
				<h1 className="text-3xl font-semibold text-center mb-6">Sky Sync</h1>
				<SearchBar />
			</div>
		</div>
	);
}
