
interface IMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  }
  
  interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  interface IClouds {
    all: number;
  }
  
  interface IWind {
    speed: number;
    deg: number;
    gust: number;
  }
  
  interface ISys {
    pod: string;
  }
  

 export interface IWeatherList {
    dt: number;
    main: IMain;
    weather: IWeather[];
    clouds: IClouds;
    wind: IWind;
    visibility: number;
    pop: number;
    sys: ISys;
    dt_txt: string;
  }

  export interface IWeatherData {
    cod: string;
    message: number; 
    cnt: number;
    list: IWeatherList[];
  }