import useSWR from "swr";
import { format } from "date-fns";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function HourlyForecast({ city }) {
	const { data, error } = useSWR(`/api/forecast?city=${city}`, fetcher);

	if (error) return <div>Failed to load</div>;
	if (!data) return <div>Loading...</div>;

	// Filter for the next 9 hours
	const hourlyData = data.list.slice(0, 3);

	return (
		<div>
			<h2 className="text-xl font-bold">3-Hourly Forecast</h2>
			<div className="flex space-x-4">
				{hourlyData.map((hour, index) => (
					<div key={index} className="card w-36 bg-base-100 shadow-xl">
						<div className="card-body">
							<p>{format(new Date(hour.dt * 1000), "p")}</p>
							<p>{Math.round(hour.main.temp)}°C</p>
							<p>{hour.weather[0].main}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
