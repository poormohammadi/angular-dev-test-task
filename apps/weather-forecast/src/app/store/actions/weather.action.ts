import { Coordinates, DailyData, HourlyData } from '@bp/weather-forecast/services/models';
import { Action } from '@ngrx/store';


export const GET_WEATHER = "GET_WEATHER";
export const SET_HOURLY_FORECAST = "SET_HOURLY_FORECAST";
export const SET_DAILY_FORECAST = "SET_DAILY_FORECAST";
export const SET_FORECAST_ERROR = "SET_FORECAST_ERROR";
export const SET_TIME_FRAME = "SET_TIME_FRAME";
export const SET_IS_LOADING = "SET_IS_LOADING";

export class GetWeather implements Action {
	readonly type = GET_WEATHER;
	constructor(public payload: Coordinates) { }
}

export class SetHourlyForecast implements Action {
	readonly type = SET_HOURLY_FORECAST;
	constructor(public payload: HourlyData[]) { }
}

export class SetDailyForecast implements Action {
	readonly type = SET_DAILY_FORECAST;
	constructor(public payload: DailyData[]) { }
}

export class SetForecastError implements Action {
	readonly type = SET_FORECAST_ERROR;
	constructor(public payload: string) { }
}

export class SetTimeFrame implements Action {
	readonly type = SET_TIME_FRAME;
	constructor(public payload: 'hourly' | 'daily') { }
}

export class SetIsLoading implements Action {
	readonly type = SET_IS_LOADING;
	constructor(public payload: boolean) { }
}

export type WeatherActions = GetWeather | SetHourlyForecast | SetDailyForecast
	| SetForecastError | SetTimeFrame | SetIsLoading;
