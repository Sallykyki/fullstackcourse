import { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [filterName, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleFilterChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().indexOf(filterName.toLowerCase()) >= 0
  );

  return (
    <div className="App">
      <div>
        countries <input value={filterName} onChange={handleFilterChange} />
      </div>
      {filterName === "" ? "" : <Countries countries={filteredCountries} />}
    </div>
  );
};

export default App;
