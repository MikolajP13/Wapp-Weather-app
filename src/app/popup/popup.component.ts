import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  RootWeather,
  WeatherClientService,
} from '../service/weather-client.service';

export interface DetailWeather {
  time: string[];
  temperature_2m: string[];
  rain: string[];
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  detailWeatherTable: DetailWeather[] = [];

  rootWeather: RootWeather = {
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

  displayedColumns: string[] = ['time', 'temperature', 'rainfall'];

  constructor(
    private weatherClient: WeatherClientService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.weatherClient
      .getWeatherForecast(
        this.weatherClient.CracowLatitude,
        this.weatherClient.CracowLongitude,
        this.weatherClient.numberOfDays
      )
      .subscribe((value) => {
        this.rootWeather = value;

        var currentDate = new Date();
        var targetDate = new Date(this.data.time);

        // compare two dates and call appropriate function based on the time difference
        // depending on the time difference addDetailDailyData function is invoked with different time ranges (0-24 hours, 24-48 hours, or 48-72 hours)
        // this allows to display specific daily data based on the time elapsed between the current date and the target date.
        if (currentDate .getDate() === targetDate.getDate()) {
          this.addDetailDailyData(value, 0, 24);
        } else if (currentDate .getDate() + 1 === targetDate.getDate()) {
          this.addDetailDailyData(value, 24, 48);
        } else {
          this.addDetailDailyData(value, 48, 72);
        }
      });
  }

  addDetailDailyData(value: any, startIndex: number, endIndex: number) {
    for (let i = startIndex; i < endIndex; i++) {
      const hour = value.hourly.time[i].substring(11, 13);
      const detailDailyData: DetailWeather = {
        time: [hour],
        temperature_2m: [value.hourly.temperature_2m[i].toFixed(0)],
        rain: [value.hourly.rain[i].toFixed(2)],
      };
      this.detailWeatherTable.push(detailDailyData);
    }
  }
}
