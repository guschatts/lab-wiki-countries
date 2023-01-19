import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


function CountryDetails(props) {
  const [foundCountry, setFoundCountry] = useState({});
  const { id } = useParams();
  const { countries } = props;


  const country = countries.find((country) => {
    return id === country.alpha3Code;
  });

  useEffect(() => {
    axios
    .get(`https://ih-countries-api.herokuapp.com/countries/${id.toLocaleUpperCase()}`)
    .then((response) => {
        setFoundCountry(response.data);
      });
    }, [id]);


  return (
    <div className="col-7">
    <img src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} alt={"country.flag"} />

      <div className="col-7">
        <h1>{foundCountry.name.official}</h1>
        <table className="table">
          <thead></thead>
          <tbody>
            <tr>
              <td style={{ width: '30%' }}>Capital</td>
              <td>{foundCountry.capital}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
                {foundCountry.area}
                <sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Borders</td>
              {foundCountry.borders.map((borderCode) => {
                const borderCountry = countries.find((item) => {
                    return borderCode === item.alpha3Code;
                });
                return (
                  <td>
                    <ul>
                      <li key={borderCode}>
                      <Link to={`/${borderCode}`}> {borderCountry.name.official}
                      </Link>
                      </li>
                    </ul>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CountryDetails;