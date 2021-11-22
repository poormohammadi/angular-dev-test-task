import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToDegreesPipe } from './pipes/to-degrees.pipe';

@NgModule({
	declarations: [
		SpinnerComponent,
		ToDegreesPipe,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
	],
	exports: [
		SpinnerComponent,
		ToDegreesPipe,
	],
})
export class WeatherForecastServicesModule { }
