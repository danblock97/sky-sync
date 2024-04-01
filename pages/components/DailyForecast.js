import useSWR from "swr";
import { format } from "date-fns";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DailyForecast({ city }) {
	const { data, error } = useSWR(`/api/forecast?city=${city}`, fetcher);

	if (error) return <div>Failed to load</div>;
	if (!data || !data.list) return <div>Loading...</div>; // Check if data or data.list is undefined

	// Filter forecasts for the next day
	const currentDate = new Date();
	const nextDayForecasts = data.list.filter((forecast) => {
		const forecastDate = new Date(forecast.dt * 1000);
		return forecastDate.getDate() !== currentDate.getDate();
	});

	return (
		<div>
			<h2 className="text-xl font-bold">Daily Forecast</h2>
			<div className="flex space-x-4">
				{nextDayForecasts.map((forecast, index) => (
					<div key={index} className="card w-36 bg-base-100 shadow-xl">
						<div className="card-body">
							<p>{format(new Date(forecast.dt * 1000), "EEE, MMM d")}</p>
							{forecast.main && forecast.main.temp && (
								<p>{Math.round(forecast.main.temp)}°C</p>
							)}{" "}
							{/* Check if temp is available */}
							{forecast.weather && forecast.weather[0] && (
								<p>{forecast.weather[0].description}</p>
							)}{" "}
							{/* Check if weather is available */}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
