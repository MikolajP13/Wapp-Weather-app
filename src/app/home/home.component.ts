import { Component, OnInit } from '@angular/core';
import {
  RootWeather,
  WeatherClientService,
} from '../service/weather-client.service';
import {
  RootCord,
  CityClientService
} from '../service/city-client.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';


export interface ThreeDaysWeather {
  time: string[];
  temperature_2m_min: number[];
  temperature_2m_max: number[];
  rain_sum: string[];
  windspeed_10m_max: string[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['date', 'temperature', 'rainfall', 'windspeed', 'info'];

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
    private cityClient: CityClientService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.weatherClient.getWeatherForecast(this.weatherClient.CracowLat, this.weatherClient.CracowLon, this.weatherClient.numberOfDays).subscribe((value) => {
      this.root = value;
      for (let i = 0; i < 3; i++) {
        const dailyData: ThreeDaysWeather = {
          time: [value.daily.time[i]],
          temperature_2m_min: [value.daily.temperature_2m_min[i]],
          temperature_2m_max: [value.daily.temperature_2m_max[i]],
          rain_sum: [value.daily.rain_sum[i].toFixed(2)],
          windspeed_10m_max: [value.daily.windspeed_10m_max[i].toFixed(2)],
        };
        this.table.push(dailyData);
      }
    });

    this.cityClient.getCityNameByCordinates(this.weatherClient.CracowLat, this.weatherClient.CracowLon).subscribe((value) => {
      this.cityNameRoot = value;
    });

  }

  openPopup(row: ThreeDaysWeather): void {
    this.dialog.open(PopupComponent, {
      data: row
    });
  }

}
