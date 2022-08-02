import React, { useEffect, useState } from "react";
import { styles } from "./styles"
import { Box, Typography, Button, Grid } from "@mui/material"
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const DailyBox = ({
    visibleDay,
    setVisibleDay,
    dayTemperature,
    nightTemperature,
    morningTemperature,
    humidity,
    minTempValue,
    maxTempValue,
    city,
    meanValue,
    modeValues
}) => {
    const [dayCounter, setDayCounter] = useState(1);
    let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const [visibleDayRaw, setVisibleDayRaw] = useState(new Date(Date.now() - tzoffset));

    const getNextDay = () => {
        if (dayCounter < 5) {
            visibleDayRaw.setDate(visibleDayRaw.getDate() + 1);
            let tzoffset = visibleDayRaw.toISOString().slice(0, -1)
            let localISOTime = tzoffset.split('T')[0]
            setVisibleDay(localISOTime)
            setDayCounter(dayCounter + 1)
        }
    }

    const getPrevDay = () => {
        if (1 < dayCounter) {
            visibleDayRaw.setDate(visibleDayRaw.getDate() - 1);
            let tzoffset = visibleDayRaw.toISOString().slice(0, -1)
            let localISOTime = tzoffset.split('T')[0]
            setVisibleDay(localISOTime)
            setDayCounter(dayCounter - 1)
        }
    }


    return (
        <Box sx={styles.gridContainer}>

            <IconButton
                onClick={() => getPrevDay(visibleDay)}
                color="primary"
                aria-label="next day"
                component="label"
                style={{ visibility: dayCounter === 1 && "hidden" }}>
                <ArrowBackIos />
            </IconButton>

            <Box sx={styles.weatherBox}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={styles.gridItemHeader}>
                        <Typography sx={styles.mainTemperatureValue}>{dayTemperature} ℃</Typography>
                        <div>
                            <Typography sx={styles.cityValue}>{city}</Typography>
                            <Typography sx={styles.dateValue}>{visibleDay}</Typography>
                        </div>

                    </Grid>
                    <Grid item xs={5} sx={styles.gridItemLeft}>
                        <Typography sx={styles.alignLeft}>Morning temperature: <strong>{morningTemperature ? morningTemperature : " - "} ℃ </strong></Typography>
                        <Typography sx={styles.alignLeft}>Day temperature: <strong>{dayTemperature} ℃</strong></Typography>
                        <Typography sx={styles.alignLeft}>Night temperature: <strong>{nightTemperature} ℃</strong></Typography>
                        <Typography sx={styles.alignLeft}>Humidity: <strong>{humidity} % </strong></Typography>

                    </Grid>
                    <Grid item xs={7} sx={styles.gridItemRight}>
                        <Typography sx={styles.alignRight}>Minimum value:<strong> {minTempValue} ℃ </strong></Typography>
                        <Typography sx={styles.alignRight}>Maximum value: <strong>{maxTempValue} ℃ </strong></Typography>
                        <Typography sx={styles.alignRight}>Mean value: <strong>{meanValue} ℃</strong> </Typography>
                        <Box sx={styles.modesBox}>

                            <Typography sx={styles.alignRight}>Mode values: </Typography>
                            <span style={{ display: "flex" }}>   {modeValues && modeValues.map((modeValue, index) => (
                                <Typography key={index} style={{ margin: 0, paddingLeft: 4 }}> <strong>{modeValue + "℃, "}</strong></Typography>
                            ))}  </span>

                        </Box>

                    </Grid>

                </Grid>
            </Box>
            <IconButton onClick={() => getNextDay()}
                color="primary" aria-label="next day"
                component="label" style={{ visibility: dayCounter === 5 && "hidden" }}>
                <ArrowForwardIos />
            </IconButton>
        </Box >
    );
}


export default DailyBox