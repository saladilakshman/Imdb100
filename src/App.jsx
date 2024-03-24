import './App.css';
import { TopMovies } from './utils/Topmovies';
import { TopSeries } from "./utils/Topseries";
import { Dialog, AppBar, Toolbar, DialogContent, useMediaQuery, useTheme, Typography, Stack, Container, Box, IconButton, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useState } from "react";
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { motion } from "framer-motion";
import { MovieDetails } from './utils/moviedetails';
export default function App() {
  const [movies, setMovies] = useState(TopMovies);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isbtnactive, setIsbtnactive] = useState(0);
  const [switchmode, setSwitchmode] = useState(false);
  const [welcometext, setWelcometext] = useState('Movies')
  const darkTheme = createTheme({
    palette: {
      mode: switchmode ? 'dark' : 'light'
    }
  })
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));
  const [passrank, setPassrank] = useState('');
  const [isshowingseries, setIshowingseries] = useState(false);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static" color="info">
        <Toolbar>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <LocalMoviesIcon sx={{
              fontSize: 32
            }} />
            <Typography variant={mobile ? 'body1' : "h5"} color="inherit">IMDbElite100</Typography>
          </Stack>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ marginLeft: 'auto' }}>
            {['Movies', 'Series'].map((types, index) => {
              return <Box component="button" key={index} sx={{
                backgroundColor: isbtnactive === index ? '#5dab94' : '',
                fontSize: { lg: 15, xs: 12 },
                border: 'none',
                padding: 1,
                borderRadius: 2,
              }}
                onClick={(e) => {
                  setIsbtnactive(index);
                  if (e.target.textContent === "Movies") {
                    setMovies(TopMovies);
                    setWelcometext('Movies');
                    setIshowingseries(false)
                  }
                  if (e.target.textContent === "Series") {
                    setMovies(TopSeries);
                    setWelcometext('Series');
                    setIshowingseries(true)
                  }

                }}
              >{types}</Box>
            })}
            <IconButton color="inherit" onClick={() => {
              setSwitchmode(prevState => !prevState)
            }}>
              {switchmode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container sx={{
        width: { xs: '100%', lg: '65%' },
        paddingBlockStart: 3
      }}>
        <Typography variant={mobile ? 'h5' : 'h4'} color="inherit" textAlign="center" sx={{ paddingBlockEnd: 3 }} id="welcome-text">Top 100 {welcometext} on IMDB list</Typography>
        <Box sx={{
          display: 'grid',
          placeItems: 'center',
          gridTemplateColumns: {
            xs: 'repeat(2,1fr)',
            sm: 'repeat(3,1fr)',
            lg: 'repeat(4,1fr)'
          },
          gap: 2
        }}>
          {movies.map((topmovie, index) => {
            const { id, image, rating, thumbnail } = topmovie;
            return <motion.div key={index} style={{
              position: 'relative',
            }}
              initial={{
                opacity: 0
              }}
              whileInView={{
                opacity: 1
              }}
            >
              <Box component="img" alt="" src={image} sx={{
                width: { xs: '100%', sm: 200, },
                height: { xs: '100%', sm: 250 },
                boxShadow: 4,
                borderRadius: 1.2,
                '&:hover': {
                  boxShadow: 24,
                  transition: '0.5s'
                }

              }}
                loading="lazy"
                onError={(e) => e.target.src = thumbnail}
                onClick={() => {
                  setPassrank(id);
                  setShowDrawer(true)
                }} />
              <Box component="div" sx={{
                backgroundColor: '#32a54a',
                color: 'white',
                width: 30,
                p: 0.5,
                position: 'absolute',
                top: 0,
                left: 0,
                fontFamily: 'system-ui',
                borderBottomRightRadius: 2
              }}>{rating}</Box>
            </motion.div>
          })}
        </Box>
      </Container>
      <Dialog open={showDrawer} onClose={() => setShowDrawer(false)} fullScreen>
        <DialogContent>
          <MovieDetails rank={passrank} breakpoints={mobile} toggler={setShowDrawer} series={isshowingseries} />
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}
