export interface UserModel {
  id: string
  gender: string
  name: UserName
  location: UserLocation
  picture: string
  email: string
}


export interface UserName {
  title: string
  first: string
  last: string
}

export interface UserLocation {
  city: string
  state: string
  country: string
  coordinates: CoordinatesModel
}

export interface CoordinatesModel {
  latitude: string, longitude: string
}
