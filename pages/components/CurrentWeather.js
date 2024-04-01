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
		<div className="border border-gray-300 rounded-lg p-4 mb-8">
			<div className="flex justify-between mb-4">
				<p className="text-sm text-gray-600">{format(currentDate, "EEEE")}</p>
				<p className="text-sm text-gray-600">
					{formatDistanceToNow(currentDate)} ago
				</p>
			</div>
			<div className="flex items-center justify-between mb-4">
				<p className="text-4xl">{Math.round(data.main.temp)}°C</p>
				<div className="flex items-center">
					<FiSunrise className="mr-2" />
					<p>{sunrise}</p>
				</div>
				<div className="flex items-center">
					<FiSunset className="mr-2" />
					<p>{sunset}</p>
				</div>
			</div>
			<div className="flex items-center justify-between mb-4">
				<p className="text-lg">{data.weather[0].description}</p>
				<Image
					src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
					alt={data.weather[0].description}
					className="w-10 h-10"
					width={40}
					height={40}
				/>
			</div>
			<p className="text-gray-500">
				H: {Math.round(data.main.temp_max)}° L: {Math.round(data.main.temp_min)}
				°
			</p>
		</div>
	);
}
