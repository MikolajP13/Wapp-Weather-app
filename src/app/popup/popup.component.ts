import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RootWeather, WeatherClientService } from '../service/weather-client.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})

export class PopupComponent implements OnInit {
  table: DetailWeather[] = [];

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

  displayedColumns: string[] = ['time', 'temperature', 'rainfall'];

  constructor(
    private weatherClient: WeatherClientService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.weatherClient.getWeatherForecast(this.weatherClient.CracowLat, this.weatherClient.CracowLon, this.weatherClient.numberOfDays).subscribe((value) => {
      this.root = value;

      var date1 = new Date();
      var date2 = new Date(this.data.time);

      if (date1.getDate() === date2.getDate()) {
        this.addDetailDailyData(value, 0, 24);
      } else if (date1.getDate() + 1 === date2.getDate()) {
        this.addDetailDailyData(value, 24, 48);
      } else {
        this.addDetailDailyData(value, 48, 72);
      }
    });
  }

  addDetailDailyData(value: any, startIndex: number, endIndex: number) {
    for (let i = startIndex; i < endIndex; i++) {
      const hour = value.hourly.time[i].substring(11,13);
      const detailDailyData: DetailWeather = {
        time: [hour],
        temperature_2m: [value.hourly.temperature_2m[i].toFixed(0)],
        rain: [value.hourly.rain[i].toFixed(2)],
      };
      this.table.push(detailDailyData);
    }
  }
}

export interface DetailWeather {
  time: string[];
  temperature_2m: string[];
  rain: string[];
}
