import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CurrentWeather({ city }) {
	const { data, error } = useSWR(`/api/weather?city=${city}`, fetcher);

	if (error) return <div>Failed to load weather data</div>;
	if (!data || !data.main) return <div>Loading...</div>; // Check if data or data.main is undefined

	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			<div className="card-body">
				<h2 className="card-title">{data.name}</h2>
				{data.main.temp && (
					<p>Temperature: {Math.round(data.main.temp)}°C</p>
				)}{" "}
				{/* Check if temp is available */}
				{data.weather && data.weather[0] && (
					<p>Condition: {data.weather[0].description}</p>
				)}{" "}
				{/* Check if weather is available */}
			</div>
		</div>
	);
}
