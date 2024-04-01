import { useRouter } from "next/router";
import CurrentWeather from "../components/CurrentWeather";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";

export default function CityWeather() {
	const router = useRouter();
	const { city } = router.query;

	return (
		<div className="mx-auto max-w-4xl p-8 bg-white rounded-lg shadow-lg">
			<h1 className="text-3xl font-semibold mb-4">
				Weather Forecast for {city}
			</h1>
			<CurrentWeather city={city} />
			<HourlyForecast city={city} />
			<DailyForecast city={city} />
		</div>
	);
}
