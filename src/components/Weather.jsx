import React, { useEffect, useState } from "react";
import Clear from "./Images/Clear.png";
import Cloudy from "./Images/Cloudy.png";
import Haze from "./Images/Haze.png";
import Sunny from "./Images/Sunny.png";
import Windy from "./Images/Windy.png";
import Rainy from "./Images/Rainy.png";
import Fog from "./Images/Fog.png";
import Snowy from "./Images/Snow.png";
import Stromy from "./Images/Strom.png";
import Climate from "./Images/Climate.png";
import Search from "./Images/Search.png";
import "./Weather.css";

const Api = {
  Key: "ad48fb7c1077cd198279e9491fb33209",
  Base: "https://api.openweathermap.org/data/2.5/",
};

function WeatherApp() {
  const [searchValue, setSearchValue] = useState("");
  const [weatherStatus, setWeatherStatus] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (searchValue !== "") {
      fetch(`${Api.Base}weather?q=${searchValue}&units=metric&APPID=${Api.Key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeatherStatus(result);
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchValue]);

  function handleSearch() {
    setSearchValue(searchValue);
    if (weatherStatus.weather && weatherStatus.weather.length > 0) {
      var description = weatherStatus.weather[0].main.toLowerCase();

      switch (description) {
        case "clear":
          setImage(Clear);
          break;
        case "clouds":
          setImage(Cloudy);
          break;
        case "haze":
          setImage(Haze);
          break;
        case "sunny":
          setImage(Sunny);
          break;
        case "windy":
          setImage(Windy);
          break;
        case "rain":
          setImage(Rainy);
          break;
        case "mist":
          setImage(Fog);
          break;
        case "fog":
          setImage(Fog);
          break;
        case "strom":
          setImage(Stromy);
          break;
        case "snow":
          setImage(Snowy);
          break;
        default:
          setImage(Climate);
      }
    }
  }

  return (
    <div className="WeatherContainer" id="WeatherContainer">
      <div className="Weather" id="Weather">
        <p className="Heading">Weather Forecast</p>
        <div className="SearchContainer">
          <input
            type="text"
            className="SearchBar"
            id="SearchBar"
            placeholder="City/Town"
            onChange={(e) => setSearchValue(e.target.value)}
            autofill
          />
          <button className="btn" id="btn" onClick={handleSearch} ><img src={Search} width={30}></img></button>
        </div>

        {weatherStatus.main !== undefined ? (
          <div className="WeatherDetails" id="WeatherDetails">
            <div className="CityName" id="CityName">
              <h2 className="City">{weatherStatus.name}</h2>
              <h4 className="Country">{weatherStatus.sys.country}</h4>
            </div>

            <div className="Description" id="Description">
              <h2>{weatherStatus.weather[0].main} </h2>
              {image && <img src={image} alt="Weather" className="DiscriptionImage" id="DiscriptionImage" width={60} />}
            </div>
            <div className="Temperature" id="Temperature">
              <h1>{weatherStatus.main.temp.toFixed(0)}°C | {(weatherStatus.main.temp * (9 / 5) + 32).toFixed(0)} °F</h1>

            </div>
          </div>
        ) : (
          <p></p>
        )}
        <div className="Mountain">
        
        </div>
      </div>

      
    </div>
  );
}

export default WeatherApp;
