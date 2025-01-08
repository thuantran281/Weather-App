export interface CurrentWeather {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
  sys: {
    sunrise: number;
    sunset: number;
  };
}

export interface DailyForecast {
  list: Array<{
    dt: number;
    main: {
      min: number;
      max: number;
    }
    weather: Array<{
      main: string;
      icon: string;
      description: string;
    }>;
  }>;
}

export interface HourlyForecast {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    }
    weather: Array<{
      main: string;
      icon: string;
      description: string;
    }>;
  }>;
}