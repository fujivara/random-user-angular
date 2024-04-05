export interface UserModel {
  id: string
  gender: string
  name: UserNameModel
  location: UserLocationModel
  picture: string
  email: string
}


export interface UserNameModel {
  title: string
  first: string
  last: string
}

export interface UserLocationModel {
  city: string
  state: string
  country: string
  coordinates: UserCoordinatesModel
}

export interface UserCoordinatesModel {
  latitude: string, longitude: string
}
