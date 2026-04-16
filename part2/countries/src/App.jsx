import { use, useEffect, useState } from "react";
import axios from "axios";
import CountryInfo from "./components/CountryInfo";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [searchCountries, setSearchCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [country, setCountry] = useState([]);

  const apikey = import.meta.env.VITE_OPENWEATHER_KEY;

  useEffect(() => {
    if (search !== "") {
      setSearchCountries(
        allCountries.filter((c) =>
          c.name.common.toLowerCase().includes(search),
        ),
      );
    } else {
      setSearchCountries([]);
    }
  }, [search]);

  useEffect(() => {
    if (searchCountries.length === 1) {
      const c = searchCountries[0];
      const lat = c.capitalInfo.latlng[0];
      const long = c.capitalInfo.latlng[1];
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apikey}`,
        )
        .then((response) => {
          setWeatherInfo(response.data);
        });
      setCountry(c);
    }
  }, [searchCountries]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setAllCountries(response.data);
      });
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleOnClick = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      find countries <input value={search} onChange={handleChange} />
      {searchCountries.length === 1 && country && weatherInfo ? (
        <div>
          <CountryInfo
            name={country.name.common}
            capital={country.capital}
            area={country.area}
            languages={country.languages}
            flag={country.flags["png"]}
            temp={weatherInfo.main.temp}
            icon={weatherInfo.weather[0].icon}
            speed={weatherInfo.wind.speed}
          />
        </div>
      ) : searchCountries.length > 1 && searchCountries.length <= 10 ? (
        searchCountries.map((c) => (
          <div key={c.name.common}>
            {c.name.common}{" "}
            <button value={c.name.common.toLowerCase()} onClick={handleOnClick}>
              Show
            </button>
          </div>
        ))
      ) : searchCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : null}
    </div>
  );
}

export default App;
