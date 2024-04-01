import SearchBar from "./components/SearchBar";
import Head from "next/head";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<Head>
				<title>Sky Watcher</title>
				<meta
					name="description"
					content="Get up-to-date weather forecasts for any city with our Weather Forecast App. Plan your day and stay informed about the weather conditions."
				/>
				<meta
					name="keywords"
					content="weather, forecast, weather app, next.js, react, city, temperature, conditions"
				/>
				<link rel="icon" href="/icon.ico" />
			</Head>
			<div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
				<h1 className="text-3xl font-semibold text-center mb-6">Sky Watcher</h1>
				<SearchBar />
			</div>
		</div>
	);
}
