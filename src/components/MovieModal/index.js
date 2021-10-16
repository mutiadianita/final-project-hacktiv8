import { useEffect } from 'react'
import Typography from '@mui/material/Typography';
import {
    Backdrop,
    Box,
    Chip,
    CircularProgress,
    Fade,
    Grid,
    Modal,
    Rating
} from '@mui/material';
import { useFetch } from 'hooks';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    width: '50%',
    boxShadow: 24,
    p: 4,
};

const MovieModal = ({ open, handleClose, imdbID }) => {
    const { data, isLoading, setParams } = useFetch('https://www.omdbapi.com');
    const rating = parseFloat(data?.imdbRating) / 2;

    useEffect(() => {
        imdbID && setParams({ apiKey: '4244b12a', i: imdbID })
    }, [imdbID, setParams])

    return (
        <Modal open={open} onClose={handleClose}>
            {isLoading ?
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop> :
                <Fade in={open}>
                    <Box sx={style}>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <img src={data?.Poster} alt={data?.Title} />
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="h4" component="h2" mb={1}>
                                    {data?.Title} ({data?.Year})
                                </Typography>
                                <Box mb={3}>
                                    <Typography variant="h6" component="span" mr={3}>
                                        {data?.Runtime}
                                    </Typography>
                                    <Chip label={data?.Rated} ml={3} />
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 3
                                }}
                                >
                                    <Rating defaultValue={rating ? rating : 0} precision={0.5} readOnly />
                                    <Box sx={{ ml: 1 }}>
                                        <b>{data?.imdbRating}</b> ({data?.imdbVotes} Votes)
                                    </Box>
                                </Box>
                                <Typography variant="body1" component="p" mb={3}>
                                    {data?.Plot}
                                </Typography>
                                <Typography variant="body1" mb={1}>
                                    <b>Starred: </b> {data?.Actors}
                                </Typography>
                                <Typography variant="body1" mb={1}>
                                    <b>Director: </b> {data?.Director}
                                </Typography>
                                <Typography variant="body1" mb={1}>
                                    <b>Writer: </b> {data?.Writer}
                                </Typography>
                                <Typography variant="body1" mb={1}>
                                    <b>Language: </b> {data?.Language}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            }
        </Modal>
    )
}

export default MovieModal