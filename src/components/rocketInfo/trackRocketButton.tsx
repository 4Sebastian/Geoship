"use client"


import {IconButton} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from '@mui/icons-material/Star';
import {useState} from "react";
import {yellow} from "@mui/material/colors";

export default function TrackRocketButton(){
    const [isTracked, setTracked] = useState<boolean>(false);

    function toggleTracked(){
        setTracked(!isTracked);
    }

    return (
        <IconButton onClick={toggleTracked}>
            {isTracked ? <StarIcon sx={{ color: yellow[800] }}/> : <StarBorderIcon/>}
        </IconButton>
    )
}