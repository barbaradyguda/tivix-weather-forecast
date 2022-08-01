import React, { useEffect, useState } from "react";
import { styles } from "./styles"
import { Box, Typography, Button } from "@mui/material"


const DailyBox = ({
    visibleDay,
    setVisibleDay,
    dayTemperatures,
    nightTemperatures,
    morningTemperature,
    humidity,
    minTempValues,
    maxTempValues

}) => {

    // const dailyTemperature = (data.temp - 272.15).toFixed(2);
    // const nightlyTemperature = (data.temp - 272.15).toFixed(2);
    // const humidity = data.humidity

    useEffect(() => {
        console.debug("wherearewenow")
    }, []);


    const getMeanDailyTemperature = (dayTemperatures) => {
        // console.debug("---------dayTemperatures", dayTemperatures)
        // const sum = dayTemperatures.reduce((a, b) => a + b, 0);
        // console.debug("sum", sum)
        // const meanDailyTemperature = (sum / dayTemperatures.length) || 0;
        // console.debug("meanDailyTemperature", meanDailyTemperature)
        // return meanDailyTemperature
    }

    // const arrayDailyData = dailyData && Object.entries(dailyData);

    return (
        <Box sx={styles.searchContainer} style={{ height: 10, backgroundColor: "blue", margin: 8 }}>
            <Button onClick={()=>setVisibleDay("2022-08-02")}>
               { console.debug(visibleDay)}
                {/* <Typography>{getMeanDailyTemperature(dayTemperatures)}</Typography>
                <Typography>{getMeanDailyTemperature(dayTemperatures)}</Typography> */}
            </Button>
        </Box>
    );
}


export default DailyBox