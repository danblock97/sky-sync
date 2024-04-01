// CityWeather.js
import { useRouter } from "next/router";
import CurrentWeather from "../components/CurrentWeather";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";
import Head from "next/head";

export default function CityWeather() {
	const router = useRouter();
	const { city } = router.query;

	return (
		<div className="max-w-4xl mx-auto p-8">
			<Head>
				<title>Sky Watcher - {city}</title>
				<meta
					name="description"
					content={`Get the latest weather forecast for ${city}. Plan your day and stay informed about the weather conditions.`}
				/>
				<meta
					name="keywords"
					content={`weather, forecast, weather app, next.js, react, ${city}, temperature, conditions`}
				/>
			</Head>
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-semibold">Weather Forecast for {city}</h1>
				<button
					onClick={() => router.back()}
					className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
				>
					Search Another Location
				</button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<CurrentWeather city={city} />
				</div>
				<div>
					<HourlyForecast city={city} />
				</div>
			</div>
			<div>
				<DailyForecast city={city} />
			</div>
		</div>
	);
}
