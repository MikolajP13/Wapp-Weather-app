import { Component, OnInit } from '@angular/core';
import { WeatherClientService } from '../service/weather-client.service';
import { CityClientService, RootCities, RootCity, RootCord } from '../service/city-client.service';
import { FormControl } from '@angular/forms';

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

  constructor(private weatherClient: WeatherClientService, private cityClient: CityClientService){

  }

  myControl = new FormControl('');

  ngOnInit(): void {
    
  }

  onInputChange(event: any) {
    this.cordsCityMap = new Map();
    const enteredValue = event.target.value;
    console.log('Wprowadzono: ', enteredValue);
    this.cityClient.getCordinatesByCityName(enteredValue).subscribe(
      res => {
        this.cityRoot = res;
        this.cityRoot.forEach(element => {
          this.cordsCityMap.set(`${parseFloat(element.lat).toFixed(2).toString()},${parseFloat(element.lon).toFixed(2).toString()}`, element.display_name);
          console.log(this.cordsCityMap);
          this.searchedCities.push(new City(`${parseFloat(element.lat).toFixed(2).toString()},${parseFloat(element.lon).toFixed(2).toString()}`, element.display_name));
          // this.cityClient.getCityNameByCordinates(parseFloat(element.lat), parseFloat(element.lon)).subscribe(
          //   res => {
          //     this.cityByCord = res;
          //     console.log(this.cityByCord.city + ', ' + this.cityByCord.countryName);
          //   }
          // );
        });
      }
    )
    this.searchedCities = [];
  }

  onAction(){
    console.log("wszedłem w input!");
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