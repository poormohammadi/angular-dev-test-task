import { Coordinates } from '@bp/weather-forecast/services/models';
import { Action } from '@ngrx/store';

export const SET_LOCATION = "SET_LOCATION";
export const SEARCH_CITY = "SEARCH_CITY";
export const SET_IS_SEARCHING = "SET_IS_SEARCHING";
export const SET_CITY_ERROR = "SET_CITY_ERROR";
export const SET_CITY_NAME = "SET_CITY_NAME";

export class SetLocation implements Action {
	readonly type = SET_LOCATION;
	constructor(public payload?: Coordinates) { }
}

export class SearchCity implements Action {
	readonly type = SEARCH_CITY;
	constructor(public payload: string) { }
}

export class SetCityError implements Action {
	readonly type = SET_CITY_ERROR;
	constructor(public payload?: string) { }
}

export class SetIsSearching implements Action {
	readonly type = SET_IS_SEARCHING;
	constructor(public payload: boolean) { }
}
export class SetCityName implements Action {
	readonly type = SET_CITY_NAME;
	constructor(public payload: string) { }
}

export type CityActions = SetLocation | SearchCity | SetCityError | SetIsSearching | SetCityName;
