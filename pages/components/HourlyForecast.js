import useSWR from "swr";
import { format } from "date-fns";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function HourlyForecast({ city }) {
	const { data, error } = useSWR(`/api/forecast?city=${city}`, fetcher);

	if (error) return <div>Failed to load</div>;
	if (!data || !data.list) return <div>Loading...</div>; // Check if data or data.list is undefined

	// Filter hourly data for the next few hours (e.g., next 6 hours)
	const now = new Date();
	const nextHours = data.list.filter((forecast) => {
		const forecastDate = new Date(forecast.dt * 1000);
		return forecastDate > now && forecastDate.getHours() <= now.getHours() + 6;
	});

	return (
		<div>
			<h2 className="text-xl font-bold">Hourly Forecast</h2>
			<div className="flex space-x-4">
				{nextHours.map((hour, index) => (
					<div key={index} className="card w-36 bg-base-100 shadow-xl">
						<div className="card-body">
							<p>{format(new Date(hour.dt * 1000), "EEE, MMM d, HH:mm")}</p>
							{hour.main && hour.main.temp && (
								<p>{Math.round(hour.main.temp)}°C</p>
							)}{" "}
							{/* Check if temp is available */}
							{hour.weather && hour.weather[0] && (
								<p>{hour.weather[0].description}</p>
							)}{" "}
							{/* Check if weather is available */}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
