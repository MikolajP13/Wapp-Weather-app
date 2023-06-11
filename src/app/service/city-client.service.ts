import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CityClientService {

  constructor(private httpClient: HttpClient) { }

  public getCityNameByCordinates(): Observable<RootCord>{
    return this.httpClient.get<RootCord>('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=50.17&longitude=19.94&localityLanguage=en');
  }

  public getCordinatesByCityName(): Observable<RootCities>{
    return this.httpClient.get<RootCities>('https://geocode.maps.co/search?q=Cracow');
  }
}

export interface RootCord {
  latitude: number
  longitude: number
  continent: string
  lookupSource: string
  continentCode: string
  localityLanguageRequested: string
  city: string
  countryName: string
  countryCode: string
  postcode: string
  principalSubdivision: string
  principalSubdivisionCode: string
  plusCode: string
  locality: string
  localityInfo: LocalityInfo
}

export interface LocalityInfo {
  LikelyLand: boolean
  administrative: Administrative[]
  informative: Informative[]
}

export interface Administrative {
  name: string
  description: string
  order: number
  adminLevel: number
  isoCode?: string
  wikidataId: string
  geonameId: number
}

export interface Informative {
  name: string
  description: string
  order: number
  isoCode?: string
  wikidataId?: string
  geonameId?: number
}

export type RootCities = RootCity[]

export interface RootCity {
  place_id: number
  licence: string
  powered_by: string
  osm_type: string
  osm_id: number
  boundingbox: string[]
  lat: string
  lon: string
  display_name: string
  class: string
  type: string
  importance: number
}