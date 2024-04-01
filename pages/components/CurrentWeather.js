// CurrentWeather.js
import useSWR from "swr";
import { format, formatDistanceToNow } from "date-fns";
import { FiSunrise, FiSunset } from "react-icons/fi";
import Image from "next/image";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CurrentWeather({ city }) {
	const { data, error } = useSWR(`/api/weather?city=${city}`, fetcher);

	if (error)
		return <div className="text-red-600">Failed to load weather data</div>;
	if (!data || !data.main)
		return <div className="text-gray-600">Loading...</div>;

	const currentDate = new Date();
	const sunrise = format(new Date(data.sys.sunrise * 1000), "HH:mm");
	const sunset = format(new Date(data.sys.sunset * 1000), "HH:mm");

	return (
		<div className="bg-white rounded-lg shadow-md p-6 mb-6">
			<h2 className="text-xl font-semibold mb-4">Current Weather</h2>
			<div className="flex flex-col items-center">
				<p className="text-4xl font-semibold mb-2">
					{Math.round(data.main.temp)}°C
				</p>
				<div className="flex items-center mb-2">
					<FiSunrise className="mr-1" />
					<p className="text-sm">{sunrise}</p>
				</div>
				<div className="flex items-center mb-4">
					<FiSunset className="mr-1" />
					<p className="text-sm">{sunset}</p>
				</div>
				<p className="text-lg">{data.weather[0].description}</p>
				<div className="mt-2">
					<Image
						src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
						alt={data.weather[0].description}
						className="w-12 h-12"
						width={48}
						height={48}
					/>
				</div>
			</div>
		</div>
	);
}
