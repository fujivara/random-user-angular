import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor (private readonly http: HttpClient) {}

  newUserFetched = new Subject<UserModel>();

  get (): Observable<UserModel> {
    return this.http.get(environment.USER_BASE_URL).pipe(map((response: any) => {
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
