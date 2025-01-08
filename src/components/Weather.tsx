import { useState, useEffect, Suspense } from "react";
import { HourlyForecast, DailyForecast, CurrentWeather } from '../interfaces/WeatherData'
import { fromCtoF, unixTimeConverter } from '../services/weather'
import { fetchCurrentWeather, fetchDailyForecast, fetchHourlyForecast } from '../apis/WeatherApi'
import Spinner from './Spinner'

const Weather = ({ city }: { city: string }) => {
  const [weather, setWeather] = useState<CurrentWeather | null>(null)
  const [hourlyWeather, setHourlyWeather] = useState<HourlyForecast | null>(null)
  const [dailyWeather, setDailyWeather] = useState<DailyForecast | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [unit, setUnit] = useState<'C' | 'F'>('C')

  const handleUnitChange = () => {
    setUnit(unit === 'C' ? 'F' : 'C')
  }

  const getDisplayTemp = (temp: number | undefined) => {
    return temp !== undefined ? unit === 'C' ? temp.toFixed(1) : fromCtoF(temp) : '-'
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const currentWeather = await fetchCurrentWeather(city)
        const hourlyForecast = await fetchHourlyForecast(city)
        const dailyForecast = await fetchDailyForecast(city)
        setWeather(currentWeather)
        setHourlyWeather(hourlyForecast)
        setDailyWeather(dailyForecast)
        setErrorMessage(null)
      } catch (error) {
        setErrorMessage(`No weather data found for ${city}`)
        setTimeout(() => {
          setErrorMessage(null)
          setWeather(null)
          setDailyWeather(null)
          setHourlyWeather(null)
        }, 5000)
      }
    };

    if (city) {
      fetchWeather()
    } else {
      setWeather(null)
      setDailyWeather(null)
      setHourlyWeather(null)
      setErrorMessage(null)
    }
  }, [city])

  return (
    <>
      {weather ? (
        <Suspense fallback={<Spinner />}>
          <div className="flex flex-row lg:px-16 lg:space-x-16">
            <div className="flex flex-col p-7 lg:mx-3 text-center">
              <p className="text-4xl font-semibold">{weather.name}</p>
              <p className="text-sm py-2">{weather.weather[0].description}</p>
              <p className="text-5xl flex items-start justify-center py-1">
                {getDisplayTemp(weather.main.temp)}
                <button
                  onClick={handleUnitChange}
                  className={`text-sm ${unit === 'C' ? 'font-bold' : ''}`}
                >
                  °C&nbsp;
                </button>
                <span className="text-sm">|</span>
                <button
                  onClick={handleUnitChange}
                  className={`text-sm ${unit === 'F' ? 'font-bold' : ''}`}
                >
                  °F
                </button>
              </p>
              <p className="flex flex-row lg:space-x-3 justify-center items-center py-3">
                <span>
                  H: {getDisplayTemp(weather.main.temp_max)}°{unit}
                </span>
                <span>
                  L: {getDisplayTemp(weather.main.temp_min)}°{unit}
                </span>
              </p>
            </div>
            <div className="flex flex-col text-lg lg:py-10">
              <p>
                Feels like: {getDisplayTemp(weather.main.feels_like)}°{unit}
              </p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Speed: {weather.wind.speed} m/s</p>
              <p>Sunrise: {unixTimeConverter(weather.sys.sunrise)}</p>
              <p>Sunset: {unixTimeConverter(weather.sys.sunset)}</p>
            </div>
          </div>
          {/* <div className="block p-6 border border-gray rounded-lg">
            {dailyWeather ? (
              <>
                <h3>Daily Forecast</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {dailyWeather.list.map((day, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-3 border rounded-lg"
                    >
                      <p className="text-lg font-semibold">
                        {unixTimeConverter(day.dt)}
                      </p>
                      <p>
                        <span>
                          H: {getDisplayTemp(day.main.max)}°{unit}
                        </span>
                        <span className="ml-2">
                          L: {getDisplayTemp(day.main.min)}°{unit}
                        </span>
                      </p>
                      <p className="text-sm">{day.weather[0].description}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>No daily forecast available.</p>
            )}
          </div> */}
        </Suspense>
      ) : errorMessage ? (
        <div className="flex justify-center items-center mt-10">
          <p className="text-red-500 font-semibold">{errorMessage}</p>
        </div>
      ) : null}
    </>
  );
};

export default Weather