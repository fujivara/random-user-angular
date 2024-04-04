import { UserModel } from './user.model';
import { UserWeatherModel } from './user-weather.model';

export interface UserDetailsModel {
  user: UserModel
  weather: UserWeatherModel
}
