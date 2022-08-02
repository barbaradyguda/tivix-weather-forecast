import React, { useEffect, useState } from "react";
import Search from "./Search"
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

    const [allTempValues, setAllTempValues] = useState([]);
    const [meanValue, setMeanValue] = useState();
    const [modeValues, setModeValues] = useState([]);



    useEffect(() => {
        setCity("London")
    }, []);

    useEffect(() => {
        getData();
    }, [city, visibleDay]);




    const getData = async () => {
        await axios
            .get(`${apiUrl}${city}&cnt=${timestamps}&appid=${appid}`)
            .then(async (response) => {
                const weatherData = response.data;
                setWeatherData(weatherData);
                getDailyData(weatherData);
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
                let temp2 = (dailyData.main.temp - 272.15).toFixed(0)
                let maxTemp = (dailyData.main.temp_max - 272.15).toFixed(1)
                let minTemp = (dailyData.main.temp_min - 272.15).toFixed(1)

                setAllTempValues(Object.entries(allTempValues.push(temp2)))

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

                setMeanValue(getAverage(allTempValues))
                setModeValues(getMode(allTempValues))
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

    const getMode = (temps) => {

        var modes = [], count = [], i, temp, maxIndex = 0;

        for (i = 0; i < temps.length; i += 1) {
            temp = temps[i];
            count[temp] = (count[temp] || 0) + 1;
            if (count[temp] > maxIndex) {
                maxIndex = count[temp];
            }
        }

        for (i in count)
            if (count.hasOwnProperty(i)) {
                if (count[i] === maxIndex) {
                    modes.push(Number(i));
                }
            }

        return modes;

    }



    return (
        <Box sx={styles.mainContainer}>
            <Search city={city} setCity={setCity} />
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
                    meanValue={meanValue}
                    modeValues={modeValues}
                    city={city}
                />}


        </Box>
    );
};

export default WeatherForecast;
