import { Coordinates } from '@bp/weather-forecast/services/models';

import * as CityActions from '../actions';

export interface CityState {
	isSearching: boolean;
	location?: Coordinates;
	cityName: string;
	cityError?: string;
}

export const initialState: CityState = {
	isSearching: false,
	cityError: '',
	cityName: '',
}

export function reducer(state = initialState, action: CityActions.CityActions): CityState {
	switch (action.type) {
		case CityActions.SET_LOCATION: {
			return {
				...state,
				location: action.payload,
			}
		}
		case CityActions.SET_CITY_ERROR: {
			return {
				...state,
				cityError: action.payload,
			}
		}
		case CityActions.SET_CITY_NAME: {
			return {
				...state,
				cityName: action.payload,
			}
		}
		case CityActions.SET_IS_SEARCHING: {
			return {
				...state,
				isSearching: action.payload,
			}
		}
	}


	return state;
}
