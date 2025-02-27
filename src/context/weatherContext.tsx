import { createContext, useContext, useState } from "react";
import { IWeatherList } from "../types/weatherInterface";


 interface IWeatherContext {
    weatherData: Record<string,IWeatherList[]>;
    setWeatherData: (city: string, value: IWeatherList[]) => void
    resetWeatherData: ()=>void
}


const WeatherContext = createContext<IWeatherContext | undefined>(undefined)

export const WeatherProvider = ({children}: {children: React.ReactNode}) => {
    const [weatherData, setWeatherDataState] = useState <Record<string,IWeatherList[]>>({})

    const setWeatherData = (city: string, data: IWeatherList[]) => {
        setWeatherDataState(prev=>({...prev, [city]:data}))
    }

    const resetWeatherData = ()=>{
        setWeatherDataState({})
    }

    return (
        <WeatherContext.Provider value={{weatherData, setWeatherData, resetWeatherData}}>
            {children}
        </WeatherContext.Provider>
    )
}

export const useWeatherContext = ()=>{
    const context = useContext(WeatherContext)
    if (!context){
        throw new Error("useWeatherContext должен использоваться внутри WeatherProvider");
    }
    return context
}