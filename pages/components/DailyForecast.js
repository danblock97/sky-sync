// DailyForecast.js
import useSWR from "swr";
import { format } from "date-fns";
import Image from "next/image";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DailyForecast({ city }) {
	const { data, error } = useSWR(`/api/forecast?city=${city}`, fetcher);

	if (error) return <div className="text-red-600">Failed to load</div>;
	if (!data || !data.list)
		return <div className="text-gray-600">Loading...</div>;

	const dailyData = data.list.filter((item, index) => index % 8 === 0); // Only show once per day

	return (
		<div className="bg-white rounded-lg shadow-md p-6 mb-6">
			<h2 className="text-xl font-semibold mb-4">Daily Forecast</h2>
			<div>
				{dailyData.map((day, index) => (
					<div key={index} className="flex items-center justify-between mb-2">
						<p className="text-lg">{format(new Date(day.dt * 1000), "EEE")}</p>
						<div className="flex items-center">
							<p className="text-lg font-semibold mr-2">
								{Math.round(day.main.temp_max)}°C
							</p>
							<span className="text-lg text-gray-500 mr-2">/</span>
							<p className="text-lg text-gray-500">
								{Math.round(day.main.temp_min)}°C
							</p>
							<Image
								src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
								alt={day.weather[0].description}
								className="w-8 h-8"
								width={32}
								height={32}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
