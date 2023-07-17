import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WeatherClientService {
  CracowLatitude: number = 50.06;
  CracowLongitude: number = 19.94;
  numberOfDays: number = 3;

  constructor(private httpClient: HttpClient) { }

  public getWeatherForecast(latitude: number, longitude: number, days: number): Observable<RootWeather>{
    return this.httpClient.get<RootWeather>(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain&daily=temperature_2m_max,temperature_2m_min,rain_sum,windspeed_10m_max&current_weather=true&windspeed_unit=ms&forecast_days=${days}&timezone=auto`);
  }

  public getWeatherForecastBetweenDates(latitude: number, longitude: number, startDate: string, endDate: string): Observable<RootWeatherBetweenDates>{ //2023-06-21
    return this.httpClient.get<RootWeatherBetweenDates>(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,rain_sum,windspeed_10m_max&windspeed_unit=ms&start_date=${startDate}&end_date=${endDate}&timezone=auto`);
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

export interface RootWeatherBetweenDates {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  daily_units: DailyUnitsBetweenDates
  daily: DailyBetweenDates
}

export interface DailyUnitsBetweenDates {
  time: string
  weathercode: string
  temperature_2m_max: string
  temperature_2m_min: string
  rain_sum: string
  windspeed_10m_max: string
}

export interface DailyBetweenDates {
  time: string[]
  weathercode: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  rain_sum: number[]
  windspeed_10m_max: number[]
}