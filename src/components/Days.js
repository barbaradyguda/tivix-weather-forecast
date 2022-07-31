import React, { useEffect, useState } from "react";
import { styles } from "./styles"
import { Box } from "@mui/material"
import DailyBox from "./DailyBox"

const Days = ({ dailyData }) => {
    const arrayDailyData = dailyData && Object.entries(dailyData);

    return (
        <Box sx={styles.searchContainer} style={{ display: "flex" }}>
            {arrayDailyData && arrayDailyData.map((data) => (
                <DailyBox data={data[1]} />
            ))}
        </Box>
    );
}


export default Days