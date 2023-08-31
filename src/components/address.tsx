'use client';
import { List, ListItem, ListItemButton, ListItemText, Paper, TextField } from '@mui/material'

import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Address() {
    const [address, setAddress] = useState("");
    const [addressSuggestions, setAddressSuggesstions] = useState<any[]>([]);

    useEffect(() => {
        if (address != "") {
            axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=6996746ace5b4605a490e1625c60f468`)
                .then(function (response) {
                    setAddressSuggesstions(response.data.features)
                }).catch((err) => {
                    console.log(err)
                })
        }

    }, [address])

    function validAddresses() {
        if (address.length == 0) { return false; }//If its empty, don't show
            
        for (const element of addressSuggestions) { //If the current address is a suggestion, don't show
            if (element.properties.formatted == address) { return false; }
        }
        return true;
    }

    return (
        <Paper elevation={10} sx={{ width: 0.4, height: "min-content", pointerEvents: "auto" }}>
            <Paper elevation={2} sx={{ width: 1 }}>
                <TextField fullWidth sx={{ display: "inline-block" }} placeholder='Enter your Location' value={address} onChange={(event) => setAddress(event.target.value)}></TextField>
            </Paper>
            {validAddresses() &&
                <List>
                    {addressSuggestions.map((value) => (
                        <ListItem key={value.properties.formatted}>
                            <ListItemButton onClick={() => setAddress(value.properties.formatted)}>
                                <ListItemText primary={`${value.properties.formatted}`} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            }
        </Paper>
    )
}