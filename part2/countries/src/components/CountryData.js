import WeatherData from './WeatherData'

const CountryData = ({country}) => {
    return (
        <div>
            <div>
                <h1>{country.name.common}</h1>
            </div>
            <div>
                <p>Capital: {Object.values(country.capital).map((capital) => capital + " ")} </p>
                <p>Area: {country.area}</p>
            </div>
            <div>
                <h3>Languages</h3>
                <ul>
                    {Object.values(country.languages).map((language) =>  <li key={language}>{language}</li>
                    )}
                </ul>
            </div>
            <div>
                {country.flag}
            </div>
            <WeatherData latitude={country.latlng[0]} longitude={country.latlng[1]} capital={country.capital[0]}/>
        </div>
    )
}

export default CountryData