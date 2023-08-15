export type Coord = {
  lat: number;
  lon: number;
};

export type Weather = {
  iconCode: string;
  temperature: number;
  description: string;
  feelsLike: number;
  humidity: number;
  pressure: number;
  visibility: number;
  windSpeed: number;
  windDegree: number;
};

export type CityWeather = {
  cityName: string;
  coord: Coord;
  weather: Weather;
};
