import React, { useEffect, useState } from "react";
import Search from "./Search"
import axios from "axios";
// import { styles } from "./styles";

const WeatherForecast = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState("London");
    const apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=";
    const appid = "d478c88b2fe7099efacc54439530b9d3";
    const timestamps = 40; //in free demo version available is only "3-hour Forecast 5 days" option :) so I need to get 40 timestamps to get data about 5 days

    const getData = async () => {
        await axios
            .get(`${apiUrl}${city}&cnt=${timestamps}&appid=${appid}`)
            .then(async (response) => {
                const weatherData = response.data;
                setWeatherData(weatherData);

            })
            .catch((err) => console.debug(err));
    };

    useEffect(() => {
        getData();
    }, [city]);



    return (
        <div>
       {     console.debug("city",city)}
            {console.debug(weatherData)}
 <Search city={city} setCity={setCity}/>
     
     
        </div>
    );
};

export default WeatherForecast;
