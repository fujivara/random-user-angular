import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor (private readonly http: HttpClient) {}

  newUserFetched = new Subject<UserModel>();

  get (): Observable<UserModel> {
    return this.http.get('https://randomuser.me/api/').pipe(map((response: any) => {
      const { results: [user] } = response;
      const {
        name,
        email,
        gender,
        location: { city, state, country, coordinates },
        login: { uuid },
        picture: { large },
      } = user;

      return {
        id: uuid,
        name,
        email,
        gender,
        location: {
          city,
          state,
          country,
          coordinates,
        },
        picture: large,
      };
    }));
  }
}
