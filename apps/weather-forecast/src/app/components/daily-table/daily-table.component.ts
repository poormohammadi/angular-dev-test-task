import { Component, OnInit } from '@angular/core';
import { DailyData } from '@bp/weather-forecast/services/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, getCityName, getWeatherDailyData } from '../../store';

@Component({
	selector: 'bp-daily-table',
	templateUrl: './daily-table.component.html',
	styleUrls: ['./daily-table.component.scss']
})
export class DailyTableComponent implements OnInit {

	dailyData$?: Observable<DailyData[]>;
	cityName$?: Observable<string>;

	constructor(
		private store$: Store<AppState>,
	) { }

	ngOnInit(): void {
		this.cityName$ = this.store$.select(getCityName);
		this.dailyData$ = this.store$.select(getWeatherDailyData);
	}

}
