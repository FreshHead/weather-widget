import { defineStore } from 'pinia'
import type { Coord, CityWeather } from '../types'

type StateShape = {
  loading: boolean
  errorMsg: string
  cityWeatherList: CityWeather[]
}

export const useWeatherStore = defineStore('weatherStore', {
  state: (): StateShape => ({
    loading: false,
    errorMsg: '',
    cityWeatherList: []
  }),
  getters: {},
  actions: {
    async initCityWeatherList() {
      const storageCoordList = localStorage.getItem('coordList')
      if (storageCoordList) {
        this.loading = true
        await Promise.allSettled(
          (JSON.parse(storageCoordList) as Coord[]).map(async (coord) =>
            this.cityWeatherList.push(await this.getCityWithWeather(coord))
          )
        )
        this.loading = false
      } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
          this.loading = true
          this.cityWeatherList = [
            await this.getCityWithWeather({
              lat: coords.latitude,
              lon: coords.longitude
            })
          ]
          this.loading = false
        })
      }
    },

    async getCityWithWeather(coord: Coord): Promise<CityWeather> {
      return this.getWeatherByQuery(coord)
    },

    async addCity(cityName: string) {
      // Do request before checking for same name, because OpenWeather can give different name.
      // For example: Kazan -> Kazan'.
      const cityWeather = await this.getWeatherByQuery({ q: cityName })
      const cityAlreadyAded = this.cityWeatherList.find(
        (existingCityWeather) => existingCityWeather.cityName === cityWeather.cityName
      )
      if (cityAlreadyAded) {
        this.errorMsg = 'City with this name already exists.'
        return
      }
      this.cityWeatherList.push(cityWeather)
      this.updateLocalStorage()
    },

    removeCity(cityName: string) {
      this.cityWeatherList = this.cityWeatherList.filter(
        (cityWeather) => cityWeather.cityName !== cityName
      )
      this.updateLocalStorage()
    },

    swapCities(indexOfFirst: number, indexOfSecond: number) {
      this.cityWeatherList.splice(indexOfSecond, 0, this.cityWeatherList[indexOfFirst])
      if (indexOfFirst > indexOfSecond) {
        indexOfFirst++
      }
      this.cityWeatherList.splice(indexOfFirst, 1)
    },

    async getWeatherByQuery(query: object): Promise<CityWeather> {
      this.loading = true
      const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${
        import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY
      }&units=metric`
      const queryString = Object.entries(query).reduce(
        (acc, el) => (acc += `&${el[0]}=${el[1]}`),
        ''
      )
      try {
        const response = await fetch(baseUrl + queryString)
        const { name, coord, weather, main, visibility, wind } = await response.json()
        const primaryWeather = weather[0]
        this.loading = false
        return {
          coord: coord,
          cityName: name,
          weather: {
            iconCode: primaryWeather.icon,
            description: primaryWeather.description,
            temperature: main.temp.toFixed(),
            feelsLike: main.feels_like.toFixed(),
            humidity: main.humidity,
            pressure: main.pressure,
            visibility: visibility / 1000,
            windSpeed: wind.speed,
            windDegree: wind.deg
          }
        }
      } catch (error) {
        this.loading = false
        this.errorMsg = 'Error while loading weather data.'
        throw new Error('Error in OpenWeather request')
      }
    },

    updateLocalStorage() {
      const unique = (arr: any[], key: string) => {
        const keys = new Set()
        return arr.filter((el) => !keys.has(el[key]) && keys.add(el[key]))
      }
      const coordList = unique(this.cityWeatherList, 'cityName').map((cityWeather) => ({
        cityName: cityWeather.cityName,
        ...cityWeather.coord
      }))
      localStorage.setItem('coordList', JSON.stringify(coordList))
    }
  }
})
