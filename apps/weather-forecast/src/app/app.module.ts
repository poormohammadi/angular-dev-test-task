import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WeatherForecastServicesModule } from '@bp/weather-forecast/services';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DailyTableComponent } from './components/daily-table/daily-table.component';
import { ForecastTableComponent } from './components/forecast-table/forecast-table.component';
import { HourlyTableComponent } from './components/hourly-table/hourly-table.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CityEffects, reducers, WeatherEffects } from './store';

@NgModule({
	declarations: [
		AppComponent,
		SearchBoxComponent,
		ForecastTableComponent,
		DailyTableComponent,
		HourlyTableComponent,
	],
	imports: [
		BrowserModule,
		WeatherForecastServicesModule,
		ReactiveFormsModule,
		AppRoutingModule,
		StoreModule.forRoot([]),
		StoreModule.forFeature('state', reducers),
		EffectsModule.forRoot([CityEffects, WeatherEffects]),
		StoreDevtoolsModule.instrument(),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
