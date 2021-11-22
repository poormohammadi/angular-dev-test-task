import { Injectable } from '@angular/core';
import { WeatherForecastApiService } from '@bp/weather-forecast/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import {
	AppState,
	SEARCH_CITY,
	SearchCity,
	SET_CITY_ERROR,
	SetCityError,
	SetCityName,
	SetIsSearching,
	SetLocation,
} from '..';
import { SetDailyForecast, SetHourlyForecast } from './../actions/weather.action';
import { getCityName } from './../reducers';

@Injectable()
export class CityEffects {

	constructor(
		private actions$: Actions,
		private store$: Store<AppState>,
		private weatherForecastApiService: WeatherForecastApiService,
	) { }

	setCityError$ = createEffect(() => {
		return this.actions$.pipe(
			ofType<SetCityError>(SET_CITY_ERROR),
			map(() => new SetIsSearching(false)),
		)
	});

	searchCity$ = createEffect(() => {
		return this.actions$.pipe(
			ofType<SearchCity>(SEARCH_CITY),
			withLatestFrom(this.store$.select(getCityName)),
			switchMap(([action, city]) => {
				if (action.payload === city) return EMPTY;

				this.store$.dispatch(new SetIsSearching(true));
				this.store$.dispatch(new SetLocation(undefined));
				this.store$.dispatch(new SetDailyForecast([]));
				this.store$.dispatch(new SetHourlyForecast([]));
				this.store$.dispatch(new SetCityName(''));

				return this.weatherForecastApiService.searchCityName(action.payload)
					.pipe(
						map(data => {
							if (data.length == 0) {
								return new SetCityError('No City Found');
							}
							const { lat, lon } = data[0];
							this.store$.dispatch(new SetCityName(action.payload));
							this.store$.dispatch(new SetCityError(''));
							return new SetLocation({ lat, lon });
						}),
						catchError(err => {
							if (err.status === 404)
								return of(new SetCityError('No City Found'));

							return of(new SetCityError(err.error.message));
						}),
					);
			}),
		)
	});


}
