import { Component, OnInit } from '@angular/core';
import {
  RootWeatherBetweenDates,
  WeatherClientService,
} from '../service/weather-client.service';
import {
  CityClientService,
  RootCities,
  RootCord,
} from '../service/city-client.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

export interface WeatherBetweenDates {
  time: string[];
  weathercode: number[];
  temperature_2m_min: number[];
  temperature_2m_max: number[];
  rain_sum: string[];
  windspeed_10m_max: string[];
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
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
      informative: [],
    },
  };

  showWeather = false;
  cordsCityMap: Map<string, string> = new Map();
  searchedCities: City[] = [];
  selectedLocationCordinates: string = '';
  selectedDateRange = new FormGroup({
    start: new FormControl<Date | null>(null, [Validators.required]),
    end: new FormControl<Date | null>(null, [Validators.required]),
  });

  constructor(
    private weatherClient: WeatherClientService,
    private cityClient: CityClientService
  ) {}

  myControl = new FormControl('');

  today: Date = new Date();
  dateFlag: boolean = false;
  maxDate: Date = new Date();

  displayedColumns: string[] = [
    'date',
    'weatherCode',
    'temperature',
    'rainfall',
    'windspeed',
  ];
  recordCount: number = 0;
  weatherForOneDay: RootWeatherBetweenDates = {
    latitude: 0,
    longitude: 0,
    generationtime_ms: 0,
    utc_offset_seconds: 0,
    timezone: '',
    timezone_abbreviation: '',
    elevation: 0,
    daily_units: {
      time: '',
      weathercode: '',
      temperature_2m_max: '',
      temperature_2m_min: '',
      rain_sum: '',
      windspeed_10m_max: '',
    },
    daily: {
      time: [],
      weathercode: [],
      temperature_2m_max: [],
      temperature_2m_min: [],
      rain_sum: [],
      windspeed_10m_max: [],
    },
  };

  table: WeatherBetweenDates[] = [];

  ngOnInit(): void {
    this.maxDate = new Date(this.today.getTime() + 13 * 24 * 60 * 60 * 1000);
    this.today.setHours(0, 0, 0, 0);
  }

  onInputChange(event: any) {
    this.cordsCityMap = new Map();
    const enteredValue = event.target.value;
    if (enteredValue === '') this.dateFlag = false;
    else this.dateFlag = true;

    this.cityClient.getCordinatesByCityName(enteredValue).subscribe((res) => {
      this.cityRoot = res;
      const uniqueCordsSet = new Set();
      this.cityRoot.forEach((element) => {
        const coords = `${parseFloat(element.lat).toFixed(2)},${parseFloat(
          element.lon
        ).toFixed(2)}`;
        if (!uniqueCordsSet.has(coords)) {
          uniqueCordsSet.add(coords);
          this.cordsCityMap.set(coords, element.display_name);
          this.searchedCities.push(new City(coords, element.display_name));
        }
      });
    });
    this.searchedCities = [];
  }

  fillAndShowTabelWeather() {
    const cords = this.selectedLocationCordinates.split(',');
    const startDate = this.selectedDateRange.value.start as Date;
    const endDate = this.selectedDateRange.value.end as Date;
    const numOfDaysBetweenDates = this.getDayDiff(startDate, endDate) + 1;
    const startDateFormatted = this.formatDate(startDate);
    const endDateFormatted = this.formatDate(endDate);
    this.table = [];

    this.weatherClient
      .getWeatherForecastBetweenDates(
        parseFloat(cords[0]),
        parseFloat(cords[1]),
        startDateFormatted,
        endDateFormatted
      )
      .subscribe((result) => {
        for (let i = 0; i < numOfDaysBetweenDates; i++) {
          this.recordCount++;
          const weatherBetweenDates = {
            time: [result.daily.time[i]],
            weathercode: result.daily.weathercode[i] != null ? [result.daily.weathercode[i]] : [],
            temperature_2m_min: result.daily.temperature_2m_min[i] != null ? [result.daily.temperature_2m_min[i]] : [],
            temperature_2m_max: result.daily.temperature_2m_max[i] != null ? [result.daily.temperature_2m_max[i]] : [],
            rain_sum: result.daily.rain_sum[i]  != null ? [result.daily.rain_sum[i].toFixed(2)] : ["--"],
            windspeed_10m_max: result.daily.windspeed_10m_max[i] != null ? [result.daily.windspeed_10m_max[i].toFixed(2)] : ["--"]
          };
          this.table.push(weatherBetweenDates);
        }
      });
    this.recordCount = 0;
  }

  saveCordinates(event: MatAutocompleteSelectedEvent) {
    const city: City = event.option.value;
    this.selectedLocationCordinates = city.getCordinates();
  }

  /*
  if the location details are longer than 50 characters, code appends an ellipsis ("...") at the end
  if the city is null, it returns an empty string
  it ensures that the returned string is limited to a maximum of 50 characters
  */
  displayFn(city: City): string {
    return city
      ? city.getLocationDetails().substring(0, 50) +
          (city.getLocationDetails().length > 50 ? '...' : '')
      : '';
  }

  resetForm() {
    this.selectedDateRange.reset();
    this.myControl.reset();
    this.searchedCities = [];
    this.table = [];
    this.selectedLocationCordinates = '';
    this.dateFlag = false;
  }

  /*
  function takes a Date object, null or undefined as parameter and returns 
  a formatted date string in the format yyyy-mm-dd
  */
  formatDate(date: Date | null | undefined): string {
    if (date) {
      const year = date?.getFullYear();
      //padStart() function ensures that the number is always displayed with two digits
      const month = (date?.getMonth() + 1).toString().padStart(2, '0');
      const day = date?.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
    }

    return '';
  }

  isValidStartDate(): boolean {
    const startDate = this.selectedDateRange.value.start as Date;
    return startDate && startDate >= this.today;
  }

  isValidDateRange(): boolean {
    const startDate = this.selectedDateRange.value.start as Date;
    const endDate = this.selectedDateRange.value.end as Date;

    //if the variable is null, undefined, false, 0, an empty string or NaN condition is true
    if (!startDate || !endDate) {
      return false;
    }

    if (startDate < this.today) {
      return false;
    }

    const maxDate = new Date(startDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    if (endDate > maxDate) {
      return false;
    }

    return true;
  }

  validateForm(): void {
    if (this.isValidStartDate() && this.isValidDateRange()) {
      this.dateFlag = true;
    } else {
      this.dateFlag = false;
    }
  }

  isLocationAndDateSelected(): boolean {
    return (
      this.dateFlag &&
      this.selectedLocationCordinates !== null &&
      this.selectedLocationCordinates !== ''
    );
  }

  //function calculates the difference in days between two dates
  getDayDiff(startDate: Date, endDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;

    return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay);
  }
}

class City {
  constructor(private cordinates: string, private locationDetails: string) {}

  getCordinates(): string {
    return this.cordinates;
  }

  getLocationDetails(): string {
    return this.locationDetails;
  }
}
