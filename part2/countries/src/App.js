import {useState, useEffect} from 'react'
import axios from 'axios'

import ListOfCountries from './components/ListOfCountries'
import CountryData from './components/CountryData'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [countryInfo, setCountryInfo] = useState([])

  useEffect(() => {
    console.log("Gathering data for countries")
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data)
        console.log("Fetched countries' data")
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, [])

  useEffect(() => {
    setCountryInfo(
      countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))
    )
  }, [search])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleListOfCountriesClick = (officialCountryName) => {
    /* I used square brackets because the find function was returning an object (as it should). But my whole code
    depends on countryInfo being an array. Using square brackets allowed me to maintain countryInfo as an array. */
    setCountryInfo(
      [countryInfo.find((country) => country.name.official === officialCountryName)]
    )
  }

  return (
    <div>
      <div>
        Find countries <input value={search} onChange={handleSearchChange} autoFocus/>
      </div>
      <div>
        {countryInfo.length === 1 ? (
          <CountryData country={countryInfo[0]}/>
        ) : (
          countryInfo.length > 10 ? (
            <p>Too many results, specify another filter</p>
          ) : (
            countryInfo.length < 10 && countryInfo.length > 1 ? (
              <ListOfCountries setCountryInfo={setCountryInfo} countryInfo={countryInfo} handleListOfCountriesClick={handleListOfCountriesClick}/>
            ) : null
          )
        )
        }
      </div>
    </div>
      )
}

export default App