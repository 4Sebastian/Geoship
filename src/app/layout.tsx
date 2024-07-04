import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Box, ThemeProvider} from "@mui/material";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import theme from "@/app/theme";

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
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Box sx={{ width: "100vw", height: "100vh"}}>
              {children}
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
