import { DailyData } from './daily-data';

export interface DailyForecastResponse {
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
	daily: DailyData[];
}
