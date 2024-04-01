// CityWeather.js
import { useRouter } from "next/router";
import CurrentWeather from "../components/CurrentWeather";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";

export default function CityWeather() {
	const router = useRouter();
	const { city } = router.query;

	return (
		<div className="max-w-4xl mx-auto p-8">
			<h1 className="text-3xl font-semibold mb-8">
				Weather Forecast for {city}
			</h1>
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
