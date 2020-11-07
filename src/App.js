import React, { useEffect, useState } from 'react';
import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core"

// Import components
import InfoBox from "./components/InfoBox"
import Map from "./components/Map"

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('global');
    const [countryInfo, setCountryInfo] = useState({});
  
  // 
    useEffect(() => {
      fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo (data);
        });
    }, []);

    
  // Fetching Countries from https://disease.sh/v3/covid-19/countries
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso3,
        }));
        setCountries(countries);
        console.log("Countries", countries);
      });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    
      // Fetching Global Data from https://disease.sh/v3/covid-19/all
      // Fetching data of a Country from https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
    const url = countryCode === "global" 
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
    .then ((response) => response.json())
    .then ((data) => {
      setCountry(countryCode);
      setCountryInfo(data);
    }, []);
  };
  console.log('CountryInfo', countryInfo)


  
  return (
    <div className="app">
      <div className='app__left'>

        {/* Heade */}
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>

          {/* Title + Select Input dropdown field */}
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="global"><h5>Global</h5></MenuItem>
                {/*Loop Thorugh all the Countries*/}
                {countries.map((country)=>(
                <MenuItem value={country.value}><h5>{country.name}</h5></MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        { /*InfoBoxes*/ }
        <div className="app__stats">
          <InfoBox title= "Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title= "Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title= "Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>
        <div>
          {/* Map */}
          <Map />
        </div>
      </div>
      
      <Card className="app__right">
        <CardContent>
          <h3>Countries Table</h3> 
          <h3>will be added here</h3>
          {/* Table */}
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <h3>Graph/Chart</h3>
          <h3>will be added here</h3>
          {/* Graph */}
        </CardContent>
      </Card>
      
      
    </div>
        
  );
}

export default App;
 