'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#2c2c2e"
        }
    },
    typography: {
        fontFamily: [
            "Trueno Light",
            "Trueno"
        ].join(','),
        allVariants: {
            
        }
    }
});

export default theme;