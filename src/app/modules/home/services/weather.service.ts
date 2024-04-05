import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCoordinatesModel } from '../models/user.model';
import { map, Observable, Subject } from 'rxjs';
import { UserWeatherModel } from '../models/user-weather.model';
import weatherIcons from '../../../../assets/data/weather/weather-icons.json';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  weatherImages = JSON.parse(JSON.stringify(weatherIcons));
  newWeather = new Subject<UserWeatherModel>();

  constructor (private readonly http: HttpClient) {}

  getWithCoordinates (coordinates: UserCoordinatesModel): Observable<UserWeatherModel> {
    const { latitude, longitude } = coordinates;

    return this.http.get(`
      ${environment.WEATHER_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m&forecast_days=1
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
