import { Injectable } from '@angular/core';
import { WeatherForecastApiService } from '@bp/weather-forecast/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import {
    AppState,
    getCityLocation,
    getWeatherTimeFrame,
    SetDailyForecast,
    SetForecastError,
    SetHourlyForecast,
    SetIsLoading,
} from '..';
import * as CityActions from './../actions/city.action';
import * as WeatherActions from './../actions/weather.action';

@Injectable()
export class WeatherEffects {

	constructor(
		private actions$: Actions,
		private store$: Store<AppState>,
		private weatherForecastApiService: WeatherForecastApiService,
	) { }

	setDailyForecast$ = createEffect(() => {
		return this.actions$.pipe(
			ofType<WeatherActions.SetDailyForecast>(WeatherActions.SET_DAILY_FORECAST),
			map(action => new WeatherActions.SetIsLoading(false)),
		)
	});

	setHourlyForecast$ = createEffect(() => {
		return this.actions$.pipe(
			ofType<WeatherActions.SetHourlyForecast>(WeatherActions.SET_HOURLY_FORECAST),
			map(action => new WeatherActions.SetIsLoading(false)),
		)
	});

	setForecastError$ = createEffect(() => {
		return this.actions$.pipe(
			ofType<WeatherActions.SetForecastError>(WeatherActions.SET_FORECAST_ERROR),
			map(action => new WeatherActions.SetIsLoading(false)),
		)
	});

	setLocation$ = createEffect(() => {
		return this.actions$.pipe(
			ofType<CityActions.SetLocation>(CityActions.SET_LOCATION),
			withLatestFrom(this.store$.select(getWeatherTimeFrame)),
			switchMap(([action, timeFrame]) => {
				if (!action?.payload) return EMPTY;

				this.store$.dispatch(new SetIsLoading(true));

				if (timeFrame === 'daily') {
					return this.weatherForecastApiService.getDailyForecast(action.payload.lat, action.payload.lon)
						.pipe(
							map(data => {
								return new SetDailyForecast(data.daily);
							}),
							catchError(err => {
								return of(new SetForecastError(err.error.message));
							}),
						);
				} else {
					return this.weatherForecastApiService.getHourlyForecast(action.payload.lat, action.payload.lon)
						.pipe(
							map(data => {
								return new SetHourlyForecast(data.hourly);
							}),
							catchError(err => {
								return of(new SetForecastError(err.error.message));
							}),
						);
				}
			}),
		)
	});

	setTimeFrame$ = createEffect(() => {
		return this.actions$.pipe(
			ofType<WeatherActions.SetTimeFrame>(WeatherActions.SET_TIME_FRAME),
			withLatestFrom(this.store$.select(getCityLocation)),
			switchMap(([action, location]) => {
				if (!location) return EMPTY;

				this.store$.dispatch(new SetIsLoading(true));

				if (action.payload === 'daily') {
					return this.weatherForecastApiService.getDailyForecast(location.lat, location.lon)
						.pipe(
							map(data => {
								return new SetDailyForecast(data.daily);
							}),
							catchError(err => {
								return of(new SetForecastError(err.error.message));
							}),
						);
				} else {
					return this.weatherForecastApiService.getHourlyForecast(location.lat, location.lon)
						.pipe(
							map(data => {
								return new SetHourlyForecast(data.hourly);
							}),
							catchError(err => {
								return of(new SetForecastError(err.error.message));
							}),
						);
				}
			})
		)
	});

}
