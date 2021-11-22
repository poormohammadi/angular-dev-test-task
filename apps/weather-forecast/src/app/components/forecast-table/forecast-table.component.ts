import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, getCityError, getIsWeatherLoading, getWeatherTimeFrame } from '../../store';

@Component({
	selector: 'bp-forecast-table',
	templateUrl: './forecast-table.component.html',
	styleUrls: ['./forecast-table.component.scss']
})
export class ForecastTableComponent implements OnInit {

	timeFrame$?: Observable<'hourly' | 'daily' | undefined>;
	cityError$?: Observable<string | undefined>;
	isLoading$?: Observable<boolean>;

	constructor(
		private store$: Store<AppState>,
	) { }

	ngOnInit(): void {
		this.timeFrame$ = this.store$.select(getWeatherTimeFrame);
		this.cityError$ = this.store$.select(getCityError);
		this.isLoading$ = this.store$.select(getIsWeatherLoading);
	}

}
