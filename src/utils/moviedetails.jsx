import { Container, Box, Stack, Typography, Button, CircularProgress } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from "axios";
import { useState, useEffect } from "react";
import { API_KEY } from "../Api";
import ReactPlayer from 'react-player/lazy';
// eslint-disable-next-line react/prop-types
export const MovieDetails = ({ rank, breakpoints, toggler, series }) => {
    const [movieinfo, setMovieinfo] = useState({});
    const [showloader, setShowloader] = useState(true);
    useEffect(() => {
        const options = {
            method: 'GET',
            url: series ? `https://imdb-top-100-movies.p.rapidapi.com/series/${rank}` : `https://imdb-top-100-movies.p.rapidapi.com/${rank}`,
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
            }
        };
        axios.request(options)
            .then(res => {
                setMovieinfo(res.data);
                console.log(res.data)
                setShowloader(false)
            })
            .catch(err => console.log(err))
    }, [rank, series])


    const text_format = (args) => {
        return new Intl.ListFormat("en-IN", { style: 'long', type: 'conjunction' }).format(args)
    }

    return <Container>

        <Button variant="contained" size="small" startIcon={<ArrowBackIosNewIcon />} color="inherit" sx={{
            marginBlockEnd: 4
        }} onClick={() => toggler(prevState => !prevState)}>Back</Button>
        {showloader ? (<Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80svh'
        }}>
            <CircularProgress color="primary" />
        </Box>) :
            (<Box>
                <Stack direction={breakpoints ? 'column' : "row"} justifyContent={"center"} alignItems={"center"} spacing={2} >
                    <Box component="img" alt="" src={movieinfo?.image} sx={{ width: 300 }} />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        gap: 2
                    }}>
                        <Typography variant="h4">{movieinfo?.title}</Typography>

                        <Typography variant="body1">Rank : #{movieinfo?.rank}</Typography>
                        <Typography variant="body1">Released Year : {movieinfo?.year}</Typography>
                        <Typography variant="body1">Rating : {movieinfo?.rating}</Typography>
                        <Typography variant="body1">Genres : {text_format(movieinfo?.genre)}</Typography>
                        <Typography variant="body1">Director : {text_format(movieinfo?.director) === '' ? 'NA' : text_format(movieinfo?.director)}</Typography>
                        <Typography variant="body1">Writers : {text_format(movieinfo?.writors) === '' ? 'NA' : text_format(movieinfo?.writors)}</Typography>
                        <Typography variant="h6">Plot : {movieinfo?.description}</Typography>
                    </Box>
                </Stack>
                <Box component="div" sx={{
                    position: 'relative',
                    marginBlockStart: 15,
                    width: '100%'
                }}>
                    <ReactPlayer
                        url={movieinfo?.trailer_embed_link}
                        style={{
                            position: 'absolute',
                            left: -30,
                        }}
                        width={breakpoints ? '120%' : '50rem'}
                        height={breakpoints ? '15rem' : '25rem'}
                        pip={true}
                        controls={true}
                    />
                </Box>
            </Box>)}
    </Container>
}