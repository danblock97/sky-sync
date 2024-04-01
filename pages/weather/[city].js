import { useRouter } from "next/router";
import CurrentWeather from "../components/CurrentWeather";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";

export default function CityWeather() {
	const router = useRouter();
	const { city } = router.query;

	return (
		<div>
			<CurrentWeather city={city} />
			<HourlyForecast city={city} />
			<DailyForecast city={city} />
		</div>
	);
}
