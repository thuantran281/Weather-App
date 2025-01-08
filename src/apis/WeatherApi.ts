import { API_KEY, API_BASE_URL } from '../utils/config'
import { CurrentWeather, DailyForecast, HourlyForecast } from '../interfaces/WeatherData'
import axios from 'axios'

export const fetchCurrentWeather = async (city: string | { latitude: number; longitude: number }): Promise<CurrentWeather> => {
  let url: string = `${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`

  if (typeof city === 'object') {
    url = `${API_BASE_URL}/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${API_KEY}&units=metric`
  }

  const response = await axios.get(url)
  
  return response.data as CurrentWeather
}

export const fetchDailyForecast = async (city: string | { latitude: number; longitude: number }) : Promise<DailyForecast> => {
  let url: string = `${API_BASE_URL}/forecast/daily?q=${city}&cnt=5&appid=${API_KEY}&units=metric`

  if (typeof city === 'object') {
    url = `${API_BASE_URL}/forecast/daily?lat=${city.latitude}&cnt=5&lon=${city.longitude}&appid=${API_KEY}&units=metric`
  }

  const response = await axios.get(url)
  
  return response.data as DailyForecast
}

export const fetchHourlyForecast = async (city: string | { latitude: number; longitude: number }) : Promise<HourlyForecast> => {
  let url: string = `${API_BASE_URL}/forecast/hourly?q=${city}&appid=${API_KEY}&units=metric`

  if (typeof city === 'object') {
    url = `${API_BASE_URL}/forecast/hourly?lat=${city.latitude}&lon=${city.longitude}&appid=${API_KEY}&units=metric`
  }

  const response = await axios.get(url)

  return response.data as HourlyForecast
}