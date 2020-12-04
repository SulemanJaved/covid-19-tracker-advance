import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

// Changing Circles on Cases Type
const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        rgb: "rgb(204, 16, 52)",
        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier: 600,
    },
    recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 600,
    },
    deaths: {
        hex: "#fb4443",
        rgb: "rgb(251, 68, 67)",
        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier: 600,
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
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
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