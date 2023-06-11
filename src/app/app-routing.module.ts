import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutWappComponent } from './about-wapp/about-wapp.component';
import { HomeComponent } from './home/home.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [ 
  {path: "", component: HomeComponent},
  {path: "about", component: AboutWappComponent},
  {path: "weather", component: WeatherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
