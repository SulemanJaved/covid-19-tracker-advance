import React, { useEffect, useState } from 'react';
import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core"
import "leaflet/dist/leaflet.css";

// Import components
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import {sortData, prettyPrintStat} from "./components/util";
import LineGraph from './components/LineGraph';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('global');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -15.4796 });
  const [mapZoom, setMapZoom] = useState(1.5);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  // 
  useEffect(() => { 
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
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

          const sortedData =sortData (data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data)
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
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        console.log('CountryInfolat', data.countryInfo.lat)
        console.log('CountryInfolong', data.countryInfo.long)
        setMapZoom(4);
      }, []);
  };
  // console.log('CountryInfo', countryInfo)



  return (
    <div className="app">
      <div className='app__left'>

        {/* Header */}
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>

          {/* Title + Select Input dropdown field */}
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="global"><h5>Global</h5></MenuItem>
              {/*Loop Thorugh all the Countries*/}
              {countries.map((country) => (
                <MenuItem value={country.value}><h5>{country.name}</h5></MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/*InfoBoxes*/}
        <div className="app__stats">
          <InfoBox 
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")} 
            title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} 
          />
          <InfoBox 
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")} 
            title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} 
          />
          <InfoBox
            isRed 
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")} 
            title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} 
          />
        </div>
        {/* Map */}
        <div>
          <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
        </div>
       
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases Table (Countrywise) </h3>
          <Table countries={tableData}></Table>
           {/* Graph */}
          <h3 className="app__graphTitle">Global History of {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
