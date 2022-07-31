import React, { useEffect, useState } from "react";
import { styles } from "./styles"
import { Box, Typography } from "@mui/material"


const DailyBox = ({data}) => {

    const dailyTemperature = (data.temp - 272.15).toFixed(2);
    const nightlyTemperature = (data.temp - 272.15).toFixed(2);
    const humidity = data.humidity

    useEffect(() => {
        console.debug("wherearewenow")
    }, []);

    // const arrayDailyData = dailyData && Object.entries(dailyData);

    return (
        <Box sx={styles.searchContainer} style={{ height: 10, backgroundColor: "blue", margin: 8}}>
    <Typography>
        {dailyTemperature + "C"}
    </Typography>
    <Typography>
        {dailyTemperature + "C"}
    </Typography>
    <Typography>
        {humidity + "%"}
    </Typography>
        </Box>
    );
}


export default DailyBox