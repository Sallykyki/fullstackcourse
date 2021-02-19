import Country from "./Country";

const Countries = ({ countries }) => {
  switch (true) {
    case countries.length < 1:
      return <div>No country found</div>;
    case countries.length === 1:
      return <Country country={countries[0]} />;
    case countries.length < 10:
      return (
        <div>
          {countries.map((country) => (
            <p key={country.alpha3Code}>{country.name}</p>
          ))}
        </div>
      );
    default:
      return <div>Too many matches, specify another filter</div>;
  }
};

export default Countries;
