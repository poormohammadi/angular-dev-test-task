import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, Observable } from 'rxjs';

import { AppState, getIsSearching, SearchCity, SetTimeFrame } from '../../store';
import { getCityError, getCityName } from './../../store/reducers';

@Component({
	selector: 'bp-search-box',
	templateUrl: './search-box.component.html',
	styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

	private cityFormControl = new FormControl('');
	private timeFrameFormControl = new FormControl('');

	formGroup = new FormGroup({
		city: this.cityFormControl,
		timeFrame: this.timeFrameFormControl,
	});

	isSearching$?: Observable<boolean>;
	cityName$?: Observable<string>;
	cityError$?: Observable<string | undefined>;

	constructor(
		private store$: Store<AppState>,
		private router: Router,
		private route: ActivatedRoute,
	) { }

	onQueryParamChange(p: ParamMap) {
		if (p.has('cityname')) {
			const citynameParam = p.get('cityname');
			const timeFrameParam = p.get('timeFrame') as 'hourly' | 'daily';

			if (citynameParam) {
				this.store$.dispatch(new SearchCity(citynameParam));
				this.cityFormControl.patchValue(citynameParam, { emitEvent: false });
			}
			if (timeFrameParam) {
				this.store$.dispatch(new SetTimeFrame(timeFrameParam));
				this.timeFrameFormControl.patchValue(timeFrameParam, { emitEvent: false });
			}
		}
	}

	ngOnInit(): void {
		this.isSearching$ = this.store$.select(getIsSearching);
		this.cityName$ = this.store$.select(getCityName);
		this.cityError$ = this.store$.select(getCityError);

		this.timeFrameFormControl.valueChanges.subscribe(timeFrame => {
			this.router.navigate(['.'], {
				queryParams: { timeFrame },
				queryParamsHandling: 'merge'
			});
		});

		this.cityFormControl.valueChanges
			.pipe(debounceTime(1000))
			.subscribe(cityname => {
				if (cityname) {
					this.router.navigate(['.'], {
						queryParams: { cityname },
						queryParamsHandling: 'merge'
					});
				}
			});

		this.route.queryParamMap.subscribe(p => {
			this.onQueryParamChange(p)
		});
	}

}
