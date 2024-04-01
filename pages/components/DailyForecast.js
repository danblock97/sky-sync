import useSWR from "swr";
import { format } from "date-fns";
import Image from "next/image";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DailyForecast({ city }) {
	const { data, error } = useSWR(`/api/forecast?city=${city}`, fetcher);

	if (error) return <div className="text-red-600">Failed to load</div>;
	if (!data || !data.list)
		return <div className="text-gray-600">Loading...</div>;

	const currentDate = new Date();
	const nextDays = data.list.filter((forecast) => {
		const forecastDate = new Date(forecast.dt * 1000);
		return forecastDate.getDate() !== currentDate.getDate();
	});

	return (
		<div className="border border-gray-300 rounded-lg p-4 mb-8">
			<h2 className="text-xl font-semibold mb-4">10 Day Forecast</h2>
			<div className="grid grid-cols-1 gap-4">
				{nextDays.map((forecast, index) => (
					<div key={index} className="border border-gray-200 rounded-lg p-4">
						<p className="text-lg">
							{format(new Date(forecast.dt * 1000), "EEEE")}
						</p>
						<div className="flex items-center justify-between">
							<Image
								src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
								alt={forecast.weather[0].description}
								className="w-10 h-10"
								width={40}
								height={40}
							/>
							<p className="text-gray-500">
								H: {Math.round(forecast.main.temp_max)}° L:{" "}
								{Math.round(forecast.main.temp_min)}°
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
