import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CityLocationResponse } from './models/city-location-response';
import { DailyForecastResponse } from './models/daily-forecast-response';
import { HourlyForecastResponse } from './models/hourly-forecast-response';

@Injectable({ providedIn: 'root' })
export class WeatherForecastApiService {

	// private _apiKey = '8125bf249825fc87ff290cabf0f3c974';
	private _apiKey = '010721642521f31b0fbc8c3831d45951';

	constructor(private http: HttpClient) { }

	searchCityName(cityName: string) {
		return this.http.get<CityLocationResponse>
			(`http://api.openweathermap.org/geo/1.0/direct`, {
				params: {
					q: cityName,
					limit: 1,
					appid: this._apiKey,
					units: 'metric'
				}
			});
	}

	getHourlyForecast(lat: number, lon: number) {
		return this.http.get<HourlyForecastResponse>(
			`https://api.openweathermap.org/data/2.5/onecall`, {
			params: {
				lat,
				lon,
				exclude: 'current,minutely,daily,alerts',
				appid: this._apiKey,
				units: 'metric'
			}
		});
	}

	getDailyForecast(lat: number, lon: number) {
		return this.http.get<DailyForecastResponse>(
			`https://api.openweathermap.org/data/2.5/onecall`, {
			params: {
				lat,
				lon,
				exclude: 'current,minutely,hourly,alerts',
				appid: this._apiKey,
				units: 'metric'
			}
		});
	}
}
