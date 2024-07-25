import { useEffect } from 'react';
import { useState } from 'react';
import services from './services/services';
import Countries from './components/Countries';
import Country from './components/Country';

function App() {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  // const [ message, setMessage ] = useState('')

  useEffect(() => {
    services
      .getall()
      .then((data) => {
        const countryData = data.map((country) => {
          return {
            id: country.cca3,
            name: country.name.common,
            area: country.area,
            population: country.population,
            flag: country.flags.png,
            languages:
              country.languages instanceof Object
                ? Object.values(country.languages)
                : [],
            capital: country.capital instanceof Array ? country.capital : [],
          };
        });
        console.log(countryData);
        setCountries(countryData);
      })
      .catch((error) => {
        console.log(`countryService.getAll failed: ${error.message}`);
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(value.toLowerCase())
  );
  const selectedCountry =
    filteredCountries.length === 1
      ? filteredCountries[0]
      : countries.find((country) => country.id === selectedId);

  const handleSearch = (event) => {
    event.preventDefault();
    setValue(event.target.value);
    setSelectedId('');
  };
  const handleCountrySelect = (id) => {
    setSelectedId(id);
  };

  return (
    <>
      find countries: <input value={value} onChange={handleSearch} />
      <br />
      <Countries
        countries={filteredCountries}
        handleCountrySelect={handleCountrySelect}
      />
      <br />
      <Country country={selectedCountry} />
    </>
  );
}

export default App;
