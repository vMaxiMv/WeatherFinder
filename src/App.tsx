import './App.css'
import { WeatherProvider } from './context/weatherContext'

import AppRouter from './routes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <WeatherProvider>
        <AppRouter/>
      </WeatherProvider>
    </BrowserRouter>
  )
}

export default App
