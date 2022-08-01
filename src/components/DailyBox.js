import React, { useEffect, useState } from "react";
import { styles } from "./styles"
import { Box, Typography, Button, Grid } from "@mui/material"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const DailyBox = ({
    visibleDay,
    setVisibleDay,
    dayTemperature,
    nightTemperature,
    morningTemperature,
    humidity,
    minTempValue,
    maxTempValue

}) => {

    useEffect(() => {
        setVisibleDay(visibleDay)
    }, []);


    return (
        <Box sx={styles.searchContainer} style={{ height: 10, backgroundColor: "blue", margin: 8 }}>
            <Button onClick={()=>setVisibleDay("2022-08-02")}>
   
                {/* <Typography>{getMeanDailyTemperature(dayTemperatures)}</Typography>
                <Typography>{getMeanDailyTemperature(dayTemperatures)}</Typography> */}
            </Button>
      <Typography>{visibleDay}</Typography>
      
     
           

            <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
        <Typography>temp pdnia {dayTemperature} C</Typography>
           
        </Grid>
        <Grid item xs={2}>
        <Typography>temp morn {morningTemperature} C</Typography>
      
        </Grid>
        <Grid item xs={2}>
        <Typography>temp night {nightTemperature} C</Typography>
          
        </Grid>
        <Grid item xs={2}>
        <Typography>hum {humidity} % </Typography>
       
        </Grid>
        <Grid item xs={2}>
     
            <Typography>max {maxTempValue} C </Typography>
        </Grid>
        <Grid item xs={2}>
    
            <Typography>max {maxTempValue} C </Typography>
        </Grid>
        <ArrowForwardIosIcon/>
      </Grid>
    </Box>
        </Box>
    );
}


export default DailyBox