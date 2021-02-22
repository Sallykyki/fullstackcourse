import { useEffect, useState } from "react";

const Country = ({ country, initialDisplay }) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(initialDisplay);
  }, [initialDisplay]);

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
        </div>
      ) : null}
    </div>
  );
};

export default Country;
