import { Route, Routes } from "react-router-dom"
import MainSearch from "./Pages/MainSearch";
import CityWeather from "./Pages/CityWeather";
const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainSearch />} />
            <Route path="/weather/:city" element={<CityWeather />} />
        </Routes>
    )
}

export default AppRouter;