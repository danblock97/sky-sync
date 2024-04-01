// HourlyForecast.js
import useSWR from "swr";
import { format } from "date-fns";
import Image from "next/image";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function HourlyForecast({ city }) {
	const { data, error } = useSWR(`/api/forecast?city=${city}`, fetcher);

	if (error) return <div className="text-red-600">Failed to load</div>;
	if (!data || !data.list)
		return <div className="text-gray-600">Loading...</div>;

	const hourlyData = data.list.slice(0, 5); // Only show the next 5 hours

	return (
		<div className="bg-white rounded-lg shadow-md p-6 mb-6">
			<h2 className="text-xl font-semibold mb-4">Hourly Forecast</h2>
			<div>
				{hourlyData.map((hour, index) => (
					<div key={index} className="flex items-center justify-between mb-2">
						<p className="text-lg">
							{format(new Date(hour.dt * 1000), "HH:mm")}
						</p>
						<div className="flex items-center">
							<p className="text-lg font-semibold mr-2">
								{Math.round(hour.main.temp)}°C
							</p>
							<Image
								src={`http://openweathermap.org/img/w/${hour.weather[0].icon}.png`}
								alt={hour.weather[0].description}
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
