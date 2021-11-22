import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'bp-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

	@Input() color = 'primary';
	@Input() diameter: number = 30;

	constructor() { }

	ngOnInit(): void {
	}

}
