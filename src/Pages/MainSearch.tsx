import SearchInput from "../components/SearchInput";
import searchLogo from '../assets/weatherFinder.png'
import { useWeatherFetcher } from "../hooks/useWeatherFetcher";


 const MainSearch = () => {
   const {getCity, isLoading} = useWeatherFetcher()
   
    return (
        <div>
            { <div className="flex justify-center min-h-screen items-center flex-col">
                <img className="w-50 md:w-2xs mb-5" src={searchLogo} alt="Logo Search" />
                <SearchInput search={getCity} isLoading={isLoading}/>
                <div>
                    <p className="text-[10px] md:text-sm text-gray-400">Узнать погоду в любом городе всего по одному только названию</p>
                </div>
            </div>}
        </div>
    )
}

export default MainSearch;