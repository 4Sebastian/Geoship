'use client';
import { List, ListItem, ListItemButton, ListItemText, Paper, TextField } from '@mui/material'

import React, {useState} from "react";
import {AddressSuggestion, AddressSuggestions, getAddressSuggestions} from "@/util/addressUtils";
import { debounce } from "lodash"

export default function Address() {
    const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);

    const updateAddressSuggestions = debounce(async (address: string) => {
        const data: AddressSuggestions = await getAddressSuggestions(address);
        setAddressSuggestions(data.suggestions);
    }, 500);

    function validAddresses() {
        if (addressSuggestions.length == 0) { return false; }//If suggestion list empty, don't show
        return true;
    }

    function handleAddressSubmit(code: string){
        if (code == "Enter" && addressSuggestions.length > 0) {
            location.assign(`/map/?address=${JSON.stringify(addressSuggestions[0])}`);
        }
    }

    function handleAddressSuggestion(value: any){
        location.assign(`/map/?address=${JSON.stringify(value)}`);
    }

    return (
        <Paper elevation={10} sx={{ width: 0.4, height: "min-content", pointerEvents: "auto" }}>
            <Paper elevation={2} sx={{ width: 1 }}>
                <TextField fullWidth
                           sx={{ display: "inline-block" }}
                           placeholder='Enter your Location'
                           onChange={(event) => updateAddressSuggestions(event.target.value)}
                           onKeyDown={(event) => handleAddressSubmit(event.code)}
                />
            </Paper>
            {validAddresses() &&
                <List>
                    {addressSuggestions.map((value: AddressSuggestion) => (
                        <ListItem key={value.formattedAddress}>
                            <ListItemButton onClick={() => handleAddressSuggestion(value)}>
                                <ListItemText primary={`${value.formattedAddress}`} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            }
        </Paper>
    )
}