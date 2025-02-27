import { useNavigate } from "react-router-dom"
import { useWeatherContext } from "../context/weatherContext"
import { useState } from "react"
import { getWeatherByCity } from "../api/weatherFetch"

export const useWeatherFetcher = () => {
    const {weatherData, setWeatherData} = useWeatherContext()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const getCity = async (city:string)=>{
            setIsLoading(true)
            try{
                const weatherDataQuery = await getWeatherByCity(city)
                setWeatherData(city, weatherDataQuery.list)
                navigate(`/weather/${city}`)
            }
            catch (error){
                console.error('Ошибка при получении погоды в городе',error)
            }
            finally {
                setIsLoading(false)
            }
        }
    return {getCity, isLoading}
}