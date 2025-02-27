import SearchInput from "../components/SearchInput";
import searchLogo from '../assets/weatherFinder.png'
import { useWeatherFetcher } from "../hooks/useWeatherFetcher";
import { useWeatherContext } from "../context/weatherContext";
import { Link } from "react-router-dom";
import {WeatherTempGraph } from "../components/WeatherTempGraph";
import { useEffect, useState } from "react";
import { IWeatherList } from "../types/weatherInterface";

type weatherModeGraphType =  'main.temp' | 'main.pressure' |'main.humidity'| 'wind.speed'

const CityWeather = () => {
     const {getCity, isLoading} = useWeatherFetcher()
     const {weatherData, resetWeatherData} = useWeatherContext()
     const [weatherModeGraph, setWeatherModeGraph] = useState<weatherModeGraphType>('main.temp')
     const [filteredWeatherData, setFilteredWeatherData] = useState<Record<string, IWeatherList[]>>({...weatherData})
     
    console.log('weatherData',weatherData);
    console.log('filteredWeatherData',filteredWeatherData);
    
     useEffect(() => {
        if(Object.keys(weatherData).length >= 0){
             selectTimePeriod(false)
        }
     }, [weatherData]);


     const selectTimePeriod = (flag:boolean): void => {    
        const updatedData = {...weatherData}
            Object.keys(updatedData).forEach((key)=> {
                updatedData[key] = weatherData[key].filter(item=>{
                const currentDate = new Date().toISOString().split('T')[0]
                const itemDate =  new Date(item.dt*1000).toISOString().split('T')[0]
                return flag ? currentDate === itemDate : new Date(item.dt*1000).getHours() === 12
     })
    })
    setFilteredWeatherData(updatedData)
}


      const handleSelectMode = (flag: boolean) => {
            selectTimePeriod(flag)
      }
     const handleSelectFunc = (event: React.ChangeEvent<HTMLSelectElement >) => {
        setWeatherModeGraph(event.target.value as weatherModeGraphType)
     }
    return (
    <div>
        <div className="m-10 flex md:justify-start md:flex-row items-center justify-center flex-col">
             <Link to="/"><img className="md:m-0 mb-5 w-25 md:w-30" src={searchLogo} alt="Logo Search" /></Link>
            <SearchInput search={getCity} isLoading={isLoading}/>
        </div>
        <div className="flex justify-center gap-5 md:gap-10">
        <select onChange={handleSelectFunc} id="params" className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
            <option value="main.temp">Температура</option>
            <option value="main.pressure">Давление</option>
            <option value="main.humidity">Влажность</option>
            <option value="wind.speed">Скорость ветра</option>
        </select>
        <button onClick={()=> handleSelectMode(true)} className="bg-blue-700 hover:bg-blue-900 text-white text-sm md:text-base rounded-md md:py-2 md:px-4 py-2 px-2 ">Прогноз на сегодня по часам</button>
        <button onClick={()=> handleSelectMode(false)} className="bg-blue-700 hover:bg-blue-900 text-white text-sm md:text-base rounded-md md:py-2 md:px-4 py-2 px-2 ">Прогноз на 5 дней</button>
        <button onClick={resetWeatherData} className="bg-red-700 hover:bg-blue-900 text-white text-sm md:text-base rounded-md md:py-2 md:px-4 py-2 px-2 ">Сброс</button>
        </div>
        <div className="flex justify-center"><WeatherTempGraph filteredWeatherData={filteredWeatherData} weatherModeGraph={weatherModeGraph}/></div>
        
    </div>
    )
}

export default CityWeather;