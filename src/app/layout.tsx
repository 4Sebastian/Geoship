import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Box, IconButton, Paper, Stack, ThemeProvider, Typography} from "@mui/material";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import theme from "@/app/theme";
import Image from "next/image";
import PersonIcon from '@mui/icons-material/Person';
import Head from "next/head";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Geo Ship',
  description: 'Find a rocket launch near you!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <meta name="google-adsense-account" content="ca-pub-4040139571789711"/>
    <link rel="preload" href="/fonts/truenobd.otf" as="font" type="font/otf" crossOrigin="anonymous"/>
    <link rel="preload" href="/fonts/truenolt.otf" as="font" type="font/otf" crossOrigin="anonymous"/>
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <Box sx={{width: "100vw", height: "100vh"}}>
          <Stack direction="column" sx={{width: 1, height: 1}}>
            <Paper sx={{width: 1, height: "75px", paddingX: 2, zIndex: 2, borderRadius: 0}} elevation={10}>
              <Stack direction="row"
                     sx={{width: 1, height: 1}}
                     alignItems="center"
                     justifyContent="space-between">
                <Stack sx={{width: 'fit-content', height: '50px'}} direction="row" alignItems="center" spacing={2}>
                  <Image src={'/GeoshipNoTitle.jpg'} alt={'GEOShip Logo'} width={50} height={50}
                         style={{borderRadius: '5px'}}/>
                  <Typography fontFamily="Trueno" variant="h5">GEOShip</Typography>
                </Stack>
                <IconButton aria-label="Profile" color="primary">
                  <PersonIcon fontSize="large"/>
                </IconButton>
              </Stack>
            </Paper>
            <Box sx={{width: 1, height: 1}}>
              {children}
            </Box>
          </Stack>
        </Box>
      </ThemeProvider>
    </AppRouterCacheProvider>
    </body>
    </html>
  )
}
