import api from "./api"

export const getWeatherByCity = async (city:string)=>{
    const response = await api.get('/data/2.5/forecast', {
        params: {
            q: city,
            units: 'metric',
            lang: 'ru'
        }
    })
    return response.data

}