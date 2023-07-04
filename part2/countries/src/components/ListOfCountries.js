const ListOfCountries = ({setCountryInfo, countryInfo, handleListOfCountriesClick}) => {
    return (
        <div>
            {countryInfo.map((country) => {
                return (
                    <div key={country.name.official}>
                        <li>{country.name.common}</li>
                        <button onClick={() => handleListOfCountriesClick(country.name.official)}>Show</button>
                    </div>
                )
            })}
        </div>
    )
}

export default ListOfCountries