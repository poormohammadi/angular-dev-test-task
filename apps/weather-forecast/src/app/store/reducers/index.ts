import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as Actions from '../actions';
import * as cityReducer from './city.reducer';
import * as weatherReducer from './weather.reducer';

type AppActions = Actions.CityActions & Actions.WeatherActions;

export interface AppState {
	weather: weatherReducer.WeatherState,
	city: cityReducer.CityState,
}

export const reducers: ActionReducerMap<AppState, AppActions> = {
	weather: weatherReducer.reducer,
	city: cityReducer.reducer,
}

export const selectAppState = createFeatureSelector<AppState>("state");

export const getWeatherHourlyData = createSelector(selectAppState, (state: AppState) => state?.weather?.hourlyData);
export const getWeatherDailyData = createSelector(selectAppState, (state: AppState) => state?.weather?.dailyData);
export const getWeatherTimeFrame = createSelector(selectAppState, (state: AppState) => state?.weather?.timeFrame);
export const getIsWeatherLoading = createSelector(selectAppState, (state: AppState) => state?.weather?.isLoading);

export const getCityLocation = createSelector(selectAppState, (state: AppState) => state?.city?.location);
export const getCityName = createSelector(selectAppState, (state: AppState) => state?.city?.cityName);
export const getCityError = createSelector(selectAppState, (state: AppState) => state?.city?.cityError);
export const getIsSearching = createSelector(selectAppState, (state: AppState) => state?.city?.isSearching);

