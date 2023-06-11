import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';
import { AboutWappComponent } from './about-wapp/about-wapp.component';
import { WeatherComponent } from './weather/weather.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { WeatherClientService } from './service/weather-client.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutWappComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTabsModule,
    NgbModule,  
    HttpClientModule
  ],
  providers: [WeatherClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
