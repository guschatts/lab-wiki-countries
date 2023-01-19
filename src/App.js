import "./App.css";
import {Route, Routes} from 'react-router-dom';
import { useState, UseEffect} from 'react';
// import countriesData from './countries.json';
import NavBar from './components/NavBar';
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";


import axios from 'axios';

function App() {

  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
    .get('https://ih-countries-api.herokuapp.com/countries')
    .then((res) => {
     setCountries(res.data);
  });
  // .catch((err) => console.log(err));
}, []);


return (
  <div className="App">
  <divider> Countries List</divider>
    <NavBar />

    <div className="container">
      <div className="row">
      <CountriesList countries={countries} />
        <Routes>
          <Route path="/:id" element={<CountryDetails countries={countries}/>} />
        </Routes>
      </div>
    </div>
  </div>
);
}
export default App;
