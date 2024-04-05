import { Injectable } from '@angular/core';
import { UserDetailsModel } from '../models/user-details.model';
import { interval, map, Observable } from 'rxjs';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  data: UserDetailsModel[] = [];
  weatherDataUpdate: Observable<UserDetailsModel[]>;

  constructor (private readonly weatherService: WeatherService) {
    this.data.push(...this.getAll());
    this.weatherDataUpdate = interval(300000).pipe(map(() => {
      this.data.map((userDetail) => {
        const { user: { location: { coordinates } } } = userDetail;

        this.weatherService.getWithCoordinates(coordinates).subscribe((weather) => {
          userDetail.weather = weather;
        });

        return userDetail.weather;
      });

      this.refreshData();
      return this.data;
    }));
  }

  put (details: UserDetailsModel): void {
    this.data.push(details);
    localStorage.clear();
    localStorage.setItem('data', JSON.stringify(this.data));
  }

  getAll (): UserDetailsModel[] {
    return JSON.parse(localStorage.getItem('data') || '[]');
  }

  refreshData () {
    localStorage.clear();
    localStorage.setItem('data', JSON.stringify(this.data));
  }
}
