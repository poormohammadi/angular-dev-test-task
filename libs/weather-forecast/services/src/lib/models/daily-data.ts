
interface Temp {
	day: number;
	min: number;
	max: number;
	night: number;
	eve: number;
	morn: number;
}

interface FeelsLike {
	day: number;
	night: number;
	eve: number;
	morn: number;
}

interface Weather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface DailyData {
	dt: number;
	sunrise: number;
	sunset: number;
	moonrise: number;
	moonset: number;
	moon_phase: number;
	temp: Temp;
	feels_like: FeelsLike;
	pressure: number;
	humidity: number;
	dew_point: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: Weather[];
	clouds: number;
	pop: number;
	uvi: number;
	rain?: number;
}
