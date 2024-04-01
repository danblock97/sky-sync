import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CurrentWeather({ city }) {
	const { data, error } = useSWR(`/api/weather?city=${city}`, fetcher);

	if (error) return <div>Error loading weather data</div>;
	if (!data) return <div>Loading...</div>;

	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			<div className="card-body">
				<h2 className="card-title">{data.name}</h2>
				<p>Temperature: {data.main.temp}°C</p>
				<p>Condition: {data.weather[0].description}</p>
			</div>
		</div>
	);
}
