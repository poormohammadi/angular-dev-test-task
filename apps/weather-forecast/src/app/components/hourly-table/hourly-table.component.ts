import { Component, OnInit } from '@angular/core';
import { HourlyData } from '@bp/weather-forecast/services/models';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { AppState, getCityName, getIsWeatherLoading, getWeatherHourlyData } from '../../store';

@Component({
	selector: 'bp-hourly-table',
	templateUrl: './hourly-table.component.html',
	styleUrls: ['./hourly-table.component.scss']
})
export class HourlyTableComponent implements OnInit {

	isLoading$?: Observable<boolean>;
	hourlyData$?: Observable<HourlyData[][]>;
	cityName$?: Observable<string>;

	constructor(
		private store$: Store<AppState>,
	) { }

	private splitArrayByThreeAndRemoveBetween([a, b, c, ...etc]: any[]): any[] {
		return etc.length ? [[a, c], ...this.splitArrayByThreeAndRemoveBetween(etc)] : [[a, c]];
	}

	ngOnInit(): void {
		this.isLoading$ = this.store$.select(getIsWeatherLoading);
		this.cityName$ = this.store$.select(getCityName);

		this.hourlyData$ = this.store$.select(getWeatherHourlyData)
			.pipe(
				map(res => res.length > 0 ? this.splitArrayByThreeAndRemoveBetween(res) as HourlyData[][] : []),
				map(res => res?.splice(0, 8)),
			);
	}

}
