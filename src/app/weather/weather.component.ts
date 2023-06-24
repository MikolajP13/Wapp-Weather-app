import { Component, OnInit } from '@angular/core';
import { WeatherClientService } from '../service/weather-client.service';
import { CityClientService, RootCities, RootCity, RootCord } from '../service/city-client.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRange, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { empty } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit{
  city: string = '';
  cityRoot: RootCities = [];
  cityByCord: RootCord = {
    latitude: 0,
    longitude: 0,
    continent: '',
    lookupSource: '',
    continentCode: '',
    localityLanguageRequested: '',
    city: '',
    countryName: '',
    countryCode: '',
    postcode: '',
    principalSubdivision: '',
    principalSubdivisionCode: '',
    plusCode: '',
    locality: '',
    localityInfo: {
      LikelyLand: false,
      administrative: [],
      informative: []
    }
  };

  cordsCityMap: Map<string, string> = new Map();
  searchedCities: City[] = [];
  selectedLocationCordinates: string = '';
  selectedDateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private weatherClient: WeatherClientService, private cityClient: CityClientService){

  }

  myControl = new FormControl('');

  ngOnInit(): void {
    
  }

  onInputChange(event: any) {
    this.cordsCityMap = new Map();
    const enteredValue = event.target.value;
    this.cityClient.getCordinatesByCityName(enteredValue).subscribe(
      res => {
        this.cityRoot = res;
        const uniqueCordsSet = new Set();
        this.cityRoot.forEach(element => {
          const coords = `${parseFloat(element.lat).toFixed(2)},${parseFloat(element.lon).toFixed(2)}`;
          if (!uniqueCordsSet.has(coords)) {
            uniqueCordsSet.add(coords);
            this.cordsCityMap.set(coords, element.display_name);
            this.searchedCities.push(new City(coords, element.display_name));
          }
        });
      }
    )
    this.searchedCities = [];
  }

  show(){
    const cords = this.selectedLocationCordinates.split(',');

    const startDate = this.formatDate(this.selectedDateRange.value.start);
    const endDate = this.formatDate(this.selectedDateRange.value.end);
    
    //condition check!

    this.weatherClient.getWeatherForecastBetweenDates(parseFloat(cords[0]), parseFloat(cords[1]), startDate, endDate).subscribe(
      result => {
        console.log(result.daily.temperature_2m_max);
      }
    )
  }


  saveCordinates(event: MatAutocompleteSelectedEvent) {
    const city: City = event.option.value;
    this.selectedLocationCordinates = city.getCordinates();
  }

  displayFn(city: City): string {
    return city ? city.getLocationDetails().substring(0, 50) + (city.getLocationDetails().length > 50 ? '...' : '') : '';
  }

  formatDate(date: Date | null | undefined): string{
    if (date) {
    const year = date?.getFullYear();
    const month = (date?.getMonth() + 1).toString().padStart(2, '0');
    const day = (date?.getDate()).toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
    }

    return '';
  }

}

class City {
  constructor(private cordinates: string, private locationDetails: string){
  }

  getCordinates(): string {
    return this.cordinates;
  }

  getLocationDetails(): string {
    return this.locationDetails;
  }
}