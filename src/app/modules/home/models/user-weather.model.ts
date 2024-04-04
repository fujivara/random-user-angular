export interface UserWeatherModel {
  icon: string
  title: string
  currTemperature: number
  minTemperature: number
  maxTemperature: number
  temperatureList: WeatherListItemModel[]
}

export interface WeatherListItemModel {
  hour?: number
  temperature: number
}
