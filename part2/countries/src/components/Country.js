import { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country, initialDisplay }) => {
  const [display, setDisplay] = useState(false);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    setDisplay(initialDisplay);
  }, [initialDisplay]);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((response) => response.data)
      .then((data) => setWeather(data.current));
  }, []);

  const handleShowCountry = () => {
    setDisplay(!display);
  };

  return (
    <div>
      {initialDisplay ? null : (
        <p>
          {country.name} <button onClick={handleShowCountry}>show</button>
        </p>
      )}
      {display ? (
        <div>
          <h1>{country.name}</h1>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h2>languages</h2>
          <ul>
            {country.languages.map((language) => (
              <li>{language.name}</li>
            ))}
          </ul>
          <img src={country.flag} width="200px" />
          <h2>Weather in Helsinki</h2>
          <p>
            <strong>temperature:</strong> {weather.temperature} Celsius
          </p>
          <img src={weather.weather_icons[0]} />
          <p>
            <strong>wind:</strong> {weather.wind_speed} mph direction
            {weather.wind_dir}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Country;
