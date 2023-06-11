import { Component, OnInit } from '@angular/core';
import {
  RootWeather,
  WeatherClientService,
} from '../service/weather-client.service';
import {
  RootCord,
  CityClientService
} from '../service/city-client.service';


export interface ThreeDaysWeather {
  time: string[];
  temperature_2m_min: number[];
  temperature_2m_max: number[];
  rain_sum: number[];
  windspeed_10m_max: number[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['date', 'temperature', 'rainfall', 'windspeed'];

  root: RootWeather = {
    latitude: 0,
    longitude: 0,
    generationtime_ms: 0,
    utc_offset_seconds: 0,
    timezone: '',
    timezone_abbreviation: '',
    elevation: 0,
    current_weather: {
      temperature: 0,
      windspeed: 0,
      winddirection: 0,
      weathercode: 0,
      is_day: 0,
      time: '',
    },
    hourly_units: {
      time: '',
      temperature_2m: '',
      rain: '',
    },
    hourly: {
      time: [],
      temperature_2m: [],
      rain: [],
    },
    daily_units: {
      time: '',
      temperature_2m_max: '',
      temperature_2m_min: '',
      rain_sum: '',
      windspeed_10m_max: '',
    },
    daily: {
      time: [],
      temperature_2m_max: [],
      temperature_2m_min: [],
      rain_sum: [],
      windspeed_10m_max: [],
    },
  };

  cityNameRoot: RootCord= {
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
  }

  table: ThreeDaysWeather[] = [];

  constructor(
    private weatherClient: WeatherClientService,
    private cityClient: CityClientService
  ) {}

  ngOnInit(): void {

    this.weatherClient.getWeatherForecast().subscribe((value) => {
      this.root = value;
      for (let i = 0; i < 3; i++) {
        const dailyData: ThreeDaysWeather = {
          time: [value.daily.time[i]],
          temperature_2m_min: [value.daily.temperature_2m_min[i]],
          temperature_2m_max: [value.daily.temperature_2m_max[i]],
          rain_sum: [value.daily.rain_sum[i]],
          windspeed_10m_max: [value.daily.windspeed_10m_max[i]],
        };
        this.table.push(dailyData);
      }
    });

    this.cityClient.getCityNameByCordinates().subscribe((value) => {
      this.cityNameRoot = value;
    });

  }
}
