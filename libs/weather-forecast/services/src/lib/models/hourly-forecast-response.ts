import { HourlyData } from './hourly-data';

export interface HourlyForecastResponse {
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
	hourly: HourlyData[];
}
