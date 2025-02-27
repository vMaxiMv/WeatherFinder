import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import { useWeatherContext } from "../context/weatherContext"
import CustomTooltip from "./custom/CustomTooltop"
import { IWeatherList } from "../types/weatherInterface";
import { useEffect, useState } from "react";


type weatherModeGraphType =  'main.temp' | 'main.pressure' |'main.humidity'| 'wind.speed'

interface WeatherTempGraphProps {
    filteredWeatherData: Record<string,IWeatherList[]>;
    weatherModeGraph: weatherModeGraphType
}
const GraphName = {
  'main.temp': 'Температура',
  'main.pressure': 'Давление',
  'main.humidity': 'Влажность',
  'wind.speed': 'Скорость ветра',
}
export const WeatherTempGraph = ({filteredWeatherData, weatherModeGraph}: WeatherTempGraphProps) => {
     const {weatherData} = useWeatherContext()
     const [chartWidth, setChartWidth] = useState(600);

     const firstCity = Object.keys(filteredWeatherData)[0]
     let isHourly = false
    const datesArr = filteredWeatherData[firstCity]?.map(item=>item.dt)
    
    for (const key in filteredWeatherData) {
        if(filteredWeatherData.hasOwnProperty(key))
        isHourly = filteredWeatherData[key][0] && new Date(filteredWeatherData[key][0].dt*1000).getHours() !== 12;
        break
    }

    console.log('weatherData[firstCity]}',weatherData[firstCity]);
    

     const updateChartWidth = () => {
        if (window.innerWidth < 768) {
            setChartWidth(window.innerWidth - 100); 
        } else {
            setChartWidth(600);
        }
    };

    useEffect(() => {
        updateChartWidth();
        window.addEventListener("resize", updateChartWidth);
        return () => window.removeEventListener("resize", updateChartWidth);
    }, []);
    
    return (
        <div className="mt-5">
            <LineChart
                width={chartWidth}
                height={300}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis  ticks={datesArr} dataKey="dt"  tickFormatter={(value) => isHourly ? new Date(value*1000).toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'}) : new Date(value*1000).toLocaleDateString([], {day:'2-digit', month:'2-digit'})}/>
                <YAxis/>
                <Tooltip content={<CustomTooltip/>} />
                <Legend />
                {Object.keys(filteredWeatherData).map((city, index) => (
                    <Line 
                        key={city}
                        type="monotone" 
                        data={filteredWeatherData[city]} 
                        dataKey={weatherModeGraph} 
                        stroke={["#5ea9e2", "#ff7300", "#82ca9d", "#8884d8"][index % 4]}
                        name={`${GraphName[weatherModeGraph]} (${city})`} />
                ))}
                
            </LineChart>
        </div>
    )
}