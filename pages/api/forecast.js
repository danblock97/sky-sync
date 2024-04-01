export default async function handler(req, res) {
	const { city } = req.query;

	//Check for City Parameter
	if (!city) {
		return res.status(400).json({ message: "City parameter is required" });
	}

	//Fetch Weather Data
	try {
		const apiRes = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`
		);
		const data = await apiRes.json();

		// Handle the case where the OpenWeatherMap API returns an error (e.g., city not found)
		if (data.cod !== "200") {
			return res.status(data.cod).json({ message: data.message });
		}

		//Return Weather Data
		res.status(200).json(data);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Internal Server Error", error: error.message });
	}
}
