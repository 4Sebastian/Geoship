import { Box, List, ListItem, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';

var launches = ["Saturn 07", "Forger 11", "Spix 73"];

export default function Home() {
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Stack direction="row" justifyContent="space-between" sx={{ padding: 3 }}>

        <Paper elevation={10}>
          <Stack direction="column">
            <Paper elevation={2} sx={{ padding: 1 }}>
              <Typography>Upcoming Launches</Typography>
            </Paper>
            <List>
              {launches.map((value) => (
                <ListItem key={value}>
                  <ListItemText primary={`Rocket: ${value}`} />
                </ListItem>
              ))}
            </List>
          </Stack>
        </Paper>

        <Stack direction="row" spacing={1}>
          <StarIcon></StarIcon>
          <Typography>Launch Locations</Typography>
        </Stack>
        
        <form>
          <TextField placeholder='Enter your Location'></TextField>
        </form>

      </Stack>
    </Box>
  )
}
