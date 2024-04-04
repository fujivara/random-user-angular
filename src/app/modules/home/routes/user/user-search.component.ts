import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { WeatherService } from '../../services/weather.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { UserWeatherModel } from '../../models/user-weather.model';

@Component({
  selector: 'app-user',
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css',
})
export class UserSearchComponent {
  currentUser: UserModel = {
    id: '1',
    name: {
      title: 'Mr',
      first: 'Name',
      last: 'Surname',
    },
    email: 'user.email@domain',
    picture: 'assets/img/icon-user.png',
    gender: 'Gender',
    location: {
      city: 'Kyiv',
      state: 'Kyiv',
      country: 'Ukraine',
      coordinates: {
        longitude: '50.4504',
        latitude: '30.5245',
      },
    },
  };

  currentWeather: UserWeatherModel = {
    title: 'Sunny',
    icon: 'http://openweathermap.org/img/wn/01d@2x.png',
    currTemperature: 12,
    minTemperature: 11,
    maxTemperature: 15,
    temperatureList: [
      { hour: 0, temperature: 28 },
      { hour: 1, temperature: 28.6 },
      { hour: 2, temperature: 28 },
      { hour: 3, temperature: 22 },
      { hour: 4, temperature: 24.2 },
      { hour: 5, temperature: 28 },
    ],
  };

  constructor (
    private readonly userService: UserService,
    private readonly weatherService: WeatherService,
    private readonly localstorageService: LocalstorageService,
  ) {}

  fetchData () {
    this.userService.get().subscribe((user) => {
      this.currentUser = user;
      this.userService.newUserFetched.next(user);

      this.weatherService.getWithCoordinates(user.location.coordinates).subscribe((weather) => {
        this.weatherService.newWeather.next(weather);
        this.currentWeather = weather;
      });
    });
  }

  saveDetails () {
    this.localstorageService.put({ user: this.currentUser, weather: this.currentWeather });
  }
}
