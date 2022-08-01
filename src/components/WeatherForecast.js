import React, { useEffect, useState } from "react";
import Search from "./Search"
import Chart from "./Chart"
import DailyBox from "./DailyBox"
import axios from "axios";
import { Box } from "@mui/material"
import { styles } from "./styles";

const WeatherForecast = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState(" ");
    const apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=";
    const appid = "1a9103af69a24a48d5f58a8d0592d754";
    const timestamps = 40; //in free demo version available is only "3-hour Forecast 5 days" option :) so I need to get 40 timestamps to get data about 5 days
    const [dates, setDates] = useState([]);

    let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    const [visibleDay, setVisibleDay] = useState(localISOTime.split('T')[0]);

    const [dayTemperatures, setDayTemperatures] = useState([]);
    const [dayTemperature, setDayTemperature] = useState();

    const [nightTemperatures, setNightTemperatures] = useState([]);
    const [nightTemperature, setNightTemperature] = useState();

    const [morningTemperature, setMorningTemperature] = useState(" ");

    const [humidities, setHumidities] = useState([]);
    const [humidity, setHumidity] = useState();

    const [minTempValues, setMinTempValues] = useState([]);
    const [minTempValue, setMinTempValue] = useState();

    const [maxTempValues, setMaxTempValues] = useState([]);
    const [maxTempValue, setMaxTempValue] = useState();



    useEffect(() => {
        setCity("London")
        // getDates()
    }, []);

    useEffect(() => {

        getData();
    }, [city, visibleDay]);


    const getDates = () => {

        const dates = []

        for (let i = 1; i < 6; i++) {
            const day = new Date();
            day.setDate(day.getDate() + i);
            let tzoffset = day.toISOString().slice(0, -1)
            let localISOTime = tzoffset.split('T')[0]
            dates.push(localISOTime)
        }
        setDates(dates)
    }



    const getData = async () => {
        await axios
            .get(`${apiUrl}${city}&cnt=${timestamps}&appid=${appid}`)
            .then(async (response) => {
                const weatherData = response.data;
                setWeatherData(weatherData);
                getDailyData(weatherData);
                // dates.forEach(function (date) {
                //     getDailyData(weatherData, date);
                // });


            })
            .catch((err) => console.debug(err));
    };


    const getDailyData = (weatherData) => {
        const dailiesData = weatherData.list

        dailiesData && dailiesData
            .filter((dailyData) => dailyData.dt_txt.split(' ')[0] === visibleDay)
            .map((dailyData, index) => {
                let time = dailyData.dt_txt.split(' ')[1]
                let date = dailyData.dt_txt.split(' ')[0]
                let hum = dailyData.main.humidity
                let temp = (dailyData.main.temp - 272.15).toFixed(1)
                let maxTemp = (dailyData.main.temp_max - 272.15).toFixed(1)
                let minTemp = (dailyData.main.temp_min - 272.15).toFixed(1)

                console.debug("dailyData", dailyData)

                setVisibleDay(date)
                setHumidities(Object.entries(humidities.push(hum)));

                if (time === "09:00:00" || time === "12:00:00" || time === "15:00:00" || time === "18:00:00") {
                    setDayTemperatures(Object.entries(dayTemperatures.push(temp)))

                } else if (time === "21:00:00" || time === "00:00:00" || time === "03:00:00") {

                    setNightTemperatures(Object.entries(nightTemperatures.push(temp)))
                } else if (time === "06:00:00") {
                    setMorningTemperature(temp)
                }

                setMinTempValues(Object.entries(minTempValues.push(minTemp)))
                setMaxTempValues(Object.entries(maxTempValues.push(maxTemp)))

                setDayTemperature(getAverage(dayTemperatures))
                setDayTemperature(getAverage(dayTemperatures))
                setNightTemperature(getAverage(nightTemperatures))
                setHumidity(getAverage(humidities))
                setMinTempValue(getAverage(minTempValues))
                setMaxTempValue(getAverage(maxTempValues))

            })


    }


    const getAverage = (dataArray) => {

        const arrOfNum = dataArray.map(str => {
            return Number(str);
        });

        const sum = arrOfNum.reduce((a, b) => a + b, 0);
        let meanValue = (sum / arrOfNum.length) || 0;

        return meanValue.toFixed(1)
    }



    return (
        <Box sx={styles.container}>
            <Search city={city} setCity={setCity} />
            {/* <Chart /> */}
            {weatherData &&
                <DailyBox
                    visibleDay={visibleDay}
                    setVisibleDay={setVisibleDay}
                    dayTemperature={dayTemperature}
                    nightTemperature={nightTemperature}
                    morningTemperature={morningTemperature}
                    humidity={humidity}
                    minTempValue={minTempValue}
                    maxTempValue={maxTempValue}
                />}


        </Box>
    );
};

export default WeatherForecast;
