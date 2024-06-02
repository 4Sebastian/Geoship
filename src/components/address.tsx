'use client';
import { List, ListItem, ListItemButton, ListItemText, Paper, TextField } from '@mui/material'

import React, { useState, useEffect } from "react";

export default function Address(props:{setAddress: Function}) {
    const [address, setAddress] = useState("");
    const [addressSuggestions, setAddressSuggesstions] = useState<any[]>([]);

    useEffect(() => {
        if (address != "") {
            fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=6996746ace5b4605a490e1625c60f468`)
                .then(async function (response: Response) {
                    setAddressSuggesstions((await response.json()).features)
                }).catch((err) => {
                    console.log(err)
                })
        }
    }, [address])

    function validAddresses() {
        if (addressSuggestions.length == 0) { return false; }//If suggestion list empty, don't show

        if (address == "") { return false; }//If address input is empty
            
        for (const element of addressSuggestions) { //If the current address is a suggestion, don't show
            if (element.properties.formatted == address) { return false; }
        }
        return true;
    }

    function handleAddress(value: any){
        setAddress(value.properties.formatted)
        props.setAddress(value)
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
                            <ListItemButton onClick={() => handleAddress(value)}>
                                <ListItemText primary={`${value.properties.formatted}`} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            }
        </Paper>
    )
}