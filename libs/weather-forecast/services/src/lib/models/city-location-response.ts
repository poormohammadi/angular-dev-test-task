export type CityLocationResponse = CityLocation[];
interface CityLocation {
	name: string;
	local_names: any;
	lat: number;
	lon: number;
	country: string;
}
