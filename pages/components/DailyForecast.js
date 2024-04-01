import useSWR from "swr";
import { format } from "date-fns";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DailyForecast({ city }) {
	const { data, error } = useSWR(`/api/forecast?city=${city}`, fetcher);

	if (error) return <div>Failed to load</div>;
	if (!data) return <div>Loading...</div>;

	// Assuming the first entry is today, skip to the next day
	const dailyData = data.list.filter((_, index) => index >= 8 && index <= 16);

	return (
		<div>
			<h2 className="text-xl font-bold">Daily Forecast</h2>
			<div className="flex space-x-4">
				{dailyData.map((day, index) => (
					<div key={index} className="card w-36 bg-base-100 shadow-xl">
						<div className="card-body">
							<p>{format(new Date(day.dt * 1000), "EEE, MMM d")}</p>
							<p>{Math.round(day.main.temp)}°C</p>
							<p>{day.weather[0].main}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
