import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {styles} from "./styles"
import {Box} from "@mui/material"

const filter = createFilterOptions();

const CitySearch = ({ city, setCity }) => {

    useEffect(() => {
        !cities.includes(city) && cities.push(city)
    }, [city]);


    return (
        <Box sx={styles.searchContainer}>
        <Autocomplete
            value={city}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setCity(
                        newValue
                    );
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setCity(
                        newValue.inputValue
                    );
                } else {
                    setCity(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option);
                if (inputValue !== '' && !isExisting) {
                    filtered.push(
                        inputValue
                    );
                }
                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="Choose city name"
            options={cities}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option;
            }}
            renderOption={(props, option) => <li {...props}>{option}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label="Choose or type a city name" />
            )}
        />
        </Box>
    );
}

const cities = [

    "Paris", "Warsaw", "London"
];

export default CitySearch