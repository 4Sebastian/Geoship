'use client';
import {
    Box,
    LinearProgress,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    TextField
} from '@mui/material'

import React, {useMemo, useState} from "react";
import {AddressSuggestion, AddressSuggestions, getAddressSuggestions} from "@/util/addressUtils";
import { debounce } from "lodash"
import {route, URLSearchParamsType} from "@/util/routingUtils";

export default function Address({params, inputtedAddress}: {params: URLSearchParamsType, inputtedAddress: string | undefined}) {
    const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const waitTime = 750; //milliseconds


    const updateAddressSuggestions = useMemo(() => debounce(async (address: string) => {
        const data: AddressSuggestions = await getAddressSuggestions(address);
        setAddressSuggestions(data.suggestions);
        //console.log(address)
        setIsLoading(false);
    }, waitTime, {trailing: true}), []);

    function validAddresses() {
        if (addressSuggestions.length == 0) { return false; }//If suggestion list empty, don't show
        return true;
    }

    function handleAddressSubmit(code: string){
        if (code == "Enter" && addressSuggestions.length > 0) {
            // location.assign(`/map/?address=${JSON.stringify(addressSuggestions[0])}`);
            route("/map", {address: JSON.stringify(addressSuggestions[0])}, params);
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
                           InputProps={{style: {borderRadius: 0}}}
                           placeholder='Enter your Location'
                           defaultValue={inputtedAddress}
                           onChange={(event) => {
                               setIsLoading(true)
                               updateAddressSuggestions(event.target.value)
                           }}
                           onKeyDown={(event) => handleAddressSubmit(event.code)}
                />
                {isLoading && <Box sx={{width: 1}}>
                    <LinearProgress/>
                </Box>}
            </Paper>
            {validAddresses() && !isLoading &&
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