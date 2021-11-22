import { DailyData, HourlyData } from '@bp/weather-forecast/services/models';

import * as WeatherActions from '../actions';

export interface WeatherState {
	isLoading: boolean;
	hourlyData: HourlyData[];
	dailyData: DailyData[];
	timeFrame?: 'hourly' | 'daily';
	error: string;
}

export const initialState: WeatherState = {
	hourlyData: [],
	dailyData: [],
	isLoading: false,
	error: '',
}

export function reducer(state = initialState, action: WeatherActions.WeatherActions): WeatherState {

	switch (action.type) {
		case WeatherActions.SET_IS_LOADING: {
			return {
				...state,
				isLoading: action.payload,
			}
		}
		case WeatherActions.SET_HOURLY_FORECAST: {
			return {
				...state,
				hourlyData: action.payload,
			}
		}
		case WeatherActions.SET_DAILY_FORECAST: {
			return {
				...state,
				dailyData: action.payload,
			}
		}
		case WeatherActions.SET_FORECAST_ERROR: {
			return {
				...state,
				error: action.payload,
			}
		}
		case WeatherActions.SET_TIME_FRAME: {
			return {
				...state,
				timeFrame: action.payload,
			}
		}

	}


	return state;
}
