import { TooltipProps } from 'recharts';
import {
    ValueType,
    NameType,
} from 'recharts/types/component/DefaultTooltipContent';




const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length > 0) {
        const data = payload[0].payload
        
        return(
            <div className="p-2 bg-white shadow-md border rounded">
                <p><strong>Давление:</strong> {data.main.pressure} hPa</p>
                <p><strong>Температура:</strong> {Math.round(data.main.temp)}°C</p>
                <p><strong>Влажность:</strong> {data.main.humidity}%</p>
                <p><strong>Скорость ветра:</strong> {data.wind.speed} m/s</p>
                <p>Описание: {data.weather[0].description}</p>
            </div>  
        )
    };
    return null;
}
export default CustomTooltip;
    