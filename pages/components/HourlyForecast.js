import useSWR from "swr";
import { format } from "date-fns";
import Image from "next/image";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function HourlyForecast({ city }) {
	const { data, error } = useSWR(`/api/forecast?city=${city}`, fetcher);

	if (error) return <div className="text-red-600">Failed to load</div>;
	if (!data || !data.list)
		return <div className="text-gray-600">Loading...</div>;

	const now = new Date();
	const nextHours = data.list.filter((forecast) => {
		const forecastDate = new Date(forecast.dt * 1000);
		return forecastDate > now && forecastDate.getHours() <= now.getHours() + 6;
	});

	return (
		<div className="border border-gray-300 rounded-lg p-4 mb-8">
			<h2 className="text-xl font-semibold mb-4">3 Hourly Forecast</h2>
			<div className="grid grid-cols-3 gap-4">
				{nextHours.map((hour, index) => (
					<div key={index} className="border border-gray-200 rounded-lg p-4">
						<p className="text-lg">
							{format(new Date(hour.dt * 1000), "HH:mm")}
						</p>
						<div className="flex items-center justify-center">
							<Image
								src={`http://openweathermap.org/img/w/${hour.weather[0].icon}.png`}
								alt={hour.weather[0].description}
								className="w-10 h-10"
								width={40}
								height={40}
							/>
						</div>
						<div className="flex items-center justify-center">
							<p className="text-gray-500">
								H: {Math.round(hour.main.temp_max)}°
							</p>
							<span className="mx-2">/</span>
							<p className="text-gray-500">
								L: {Math.round(hour.main.temp_min)}°
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
