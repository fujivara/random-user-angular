import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoordinatesModel } from '../models/user.model';
import { map, Observable, Subject } from 'rxjs';
import { UserWeatherModel } from '../models/user-weather.model';
import * as weatherIcons from '../../../../assets/data/weather/weather-icons.json';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  weatherImages = JSON.parse(JSON.stringify(weatherIcons));
  newWeather = new Subject<UserWeatherModel>();

  constructor (private readonly http: HttpClient) {}

  getWithCoordinates (coordinates: CoordinatesModel): Observable<UserWeatherModel> {
    const { latitude, longitude } = coordinates;

    return this.http.get(`
      https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m&forecast_days=1
    `).pipe(map((response: any) => {
      const {
        current_weather: {
          temperature,
          weathercode,
        },
        hourly: {
          time,
          temperature_2m,
        },
        daily: {
          temperature_2m_max,
          temperature_2m_min,
        },
      } = response;

      const { description, image } = this.weatherImages[weathercode].day;

      return {
        icon: image,
        title: description,
        currTemperature: temperature,
        minTemperature: temperature_2m_min,
        maxTemperature: temperature_2m_max,
        temperatureList: time.map((timeVal: string, index: number) => ({
          hour: new Date(timeVal).getHours(),
          temperature: temperature_2m[index],
        })),
      };
    }));
  }
}
