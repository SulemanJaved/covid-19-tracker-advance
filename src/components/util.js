import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

// Changing Circles on Cases Type
const casesTypeColors = {
    cases: {
        multiplier: 600,
        option: {color:"#CC1034", fillColor:"#CC1034"}
    },
    recovered: {
        multiplier: 600,
        option: {color:"#7DD71D", fillColor:"#7DD71D"}
    },
    deaths: {
        multiplier: 600,
        option: {color:"#FF6C47", fillColor:"#FF6C47"}
    },
};


// Sorting of Countries in Data according to Cases
export const sortData = (data) => {
    let sortedData = [...data];

    return sortedData.sort((a, b) => a.cases>b.cases ? -1 : 1);
};

// Numeral Properties for InfoBoxes
export const prettyPrintStat = (stat) =>
stat? `+${numeral(stat).format("0.0a")}`: "+0";

// Drawing Circles of Cases on Map with interactive tooltop
export const showDataOnMap = (data, casesType) =>
    data.map((country) => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            pathOptions={casesTypeColors[casesType].option}
            // fillColor={casesTypeColors[casesType].hex}
            fillOpacity={0.4}
            radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
            <Popup>
               <div className="info-container">
                   <div className="info-flag" style={{ backgroundImage: `url(${country.countryInfo.flag}) `}} />
                   <div className="info-name">{country.country}</div>
                   <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                   <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                   <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
               </div>
            </Popup>
        </Circle>
    
    ));