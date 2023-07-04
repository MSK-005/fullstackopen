import {useState, useEffect} from 'react'
import axios from "axios"

const WeatherData = ({latitude, longitude, capital}) => {
    const [weather, setWeather] = useState({})
    
    const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY

    /* For easy access, I created this array so that units of the weather data 
    can be changed easily. */
    const weatherUnits = ['metric', 'Celsius', 'm/s'] 
    useEffect(() => {
        console.log("Fetching weather data")
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weather_api_key}&units=${weatherUnits[0]}`)
            .then((response) => {
                setWeather(response.data)
                console.log("Successfully fetched weather data")
            })
            .catch((error) => {
                console.log(error.message)
            })
    }, [])
    
    if (Object.keys(weather).length !== 0) {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p>Temperature: {weather.main.temp} {weatherUnits[1]}</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
                <p>Wind: {weather.wind.speed} {weatherUnits[2]}</p>
            </div>
        )
    }     
    
    return null
}

export default WeatherData