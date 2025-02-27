import { useState } from "react";
import { Spinner } from "./Spinner";


interface ISearchInputProps {
    search: (value: string)=> void;
    isLoading: boolean
}

const SearchInput = ({search, isLoading}: ISearchInputProps) => {
    const [city, setCity] = useState('')

    
    const handleSubmit = (event: React.FormEvent)=>{
        event.preventDefault()
        search(city)
    }

    return (
        <div className="px-4">
            <form className="w-xs md:w-xl mx-auto max-w-3xl" onSubmit={handleSubmit}>   
                <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input onChange={(event)=>setCity(event.target.value)} type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-100 rounded-lg bg-gray-200 focus:border-blue-900" placeholder="Введите город" required />
                    {isLoading ? <Spinner/> : <button type="submit"  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4  focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:ring-blue-800">Search</button>}
                </div>
            </form>
        </div>
    )
}

export default SearchInput;