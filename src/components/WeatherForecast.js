import React, { useEffect, useState } from "react";
import Search from "./Search"
import Chart from "./Chart"
import Days from "./Days"
import axios from "axios";
import { Box } from "@mui/material"
import { styles } from "./styles";

const WeatherForecast = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState("London");
    const apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=";
    const appid = "d478c88b2fe7099efacc54439530b9d3";
    const timestamps = 40; //in free demo version available is only "3-hour Forecast 5 days" option :) so I need to get 40 timestamps to get data about 5 days
    const [dailyData, setDailyData] = useState();
    const [dayOne, setDayOne] = useState();
    const [dayTwo, setDayTwo] = useState();
    const [dayThree, setDayThree] = useState();
    const [dayFour, setDayFour] = useState();
    const [dayFive, setDayFive] = useState();

    const getData = async () => {
        await axios
            .get(`${apiUrl}${city}&cnt=${timestamps}&appid=${appid}`)
            .then(async (response) => {
                const weatherData = response.data;
                setWeatherData(weatherData);
                getDailyData(weatherData)
            })
            .catch((err) => console.debug(err));
    };

    useEffect(() => {
        getData();
    }, [city]);

    const getDailyData = (weatherData) => {
        const dailiesData = weatherData.list
        setDailyData(dailiesData.reduce((acc, day) => {
            const date = day.dt_txt.split(' ')[0];
            console.debug("day", day)
            if (acc[date]) {
                acc[date].temp_max = Math.max(acc[date].temp_max, day.main.temp_max);
                acc[date].temp_min = Math.min(acc[date].temp_min, day.main.temp_min);
                acc[date].humidity = day.main.humidity;
                acc[date].temp = day.main.temp;
            } else {
                acc[date] = { temp_max: day.main.temp_max, temp_min: day.main.temp_min, humidity: day.main.humidity, temp: day.main.temp };
            }
            return acc;
        }, {}));
        return dailyData
    }

    return (
        <Box sx={styles.container}>
            <Search city={city} setCity={setCity} />
            <Chart />
            {dailyData && <Days dailyData={dailyData} />}
        </Box>
    );
};

export default WeatherForecast;
