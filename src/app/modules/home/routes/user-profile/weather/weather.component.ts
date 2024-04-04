import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserWeatherModel } from '../../../models/user-weather.model';
import { WeatherService } from '../../../services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit, OnDestroy {
  @Input()
    weather: UserWeatherModel;

  newWeatherSubscription = new Subscription();

  constructor (private readonly weatherService: WeatherService) {}

  ngOnInit (): void {
    this.newWeatherSubscription = this.weatherService.newWeather.subscribe((weather) => {
      this.weather = weather;
    });
  }

  ngOnDestroy (): void {
    this.newWeatherSubscription.unsubscribe();
  }
}
