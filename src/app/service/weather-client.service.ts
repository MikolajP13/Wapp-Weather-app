import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/*
strona główna z obecną pogodą w Krakowie oraz pogodą jutro, oraz pojutrze
pogoda godzinowa na wybrany dzień

*/
export class WeatherClientService {

  constructor(private httpClient: HttpClient) { }

  public getWeatherForecast(latitude: number, longitude: number): Observable<RootWeather>{
    return this.httpClient.get<RootWeather>(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain&daily=temperature_2m_max,temperature_2m_min,rain_sum,windspeed_10m_max&current_weather=true&windspeed_unit=ms&forecast_days=3&timezone=auto`);
  }

}

export interface RootWeather {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_weather: CurrentWeather
  hourly_units: HourlyUnits
  hourly: Hourly
  daily_units: DailyUnits
  daily: Daily
}

export interface CurrentWeather {
  temperature: number
  windspeed: number
  winddirection: number
  weathercode: number
  is_day: number
  time: string
}

export interface HourlyUnits {
  time: string
  temperature_2m: string
  rain: string
}

export interface Hourly {
  time: string[]
  temperature_2m: number[]
  rain: number[]
}

export interface DailyUnits {
  time: string
  temperature_2m_max: string
  temperature_2m_min: string
  rain_sum: string
  windspeed_10m_max: string
}

export interface Daily {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  rain_sum: number[]
  windspeed_10m_max: number[]
}

// export interface RootWeather {
//   latitude: number
//   longitude: number
//   generationtime_ms: number
//   utc_offset_seconds: number
//   timezone: string
//   timezone_abbreviation: string
//   elevation: number
//   hourly_units: HourlyUnits
//   hourly: Hourly
// }

// export interface HourlyUnits {
//   time: string
//   temperature_2m: string
// }

// export interface Hourly {
//   time: string[]
//   temperature_2m: number[]
// }