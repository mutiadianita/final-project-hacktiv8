import { useState } from 'react'
import theme from './Theme';
import { Header, Movie, MovieModal } from 'components';
import { ThemeProvider } from '@emotion/react';
import {
    CircularProgress,
    Container,
    Grid,
    Typography
} from '@mui/material';
import { useFetch } from 'hooks';
import { styled } from '@mui/material/styles';

const App = () => {
    const defaultSearch = 'man';
    const [modalShow, setModalShow] = useState(false);
    const [imdbID, setImdbID] = useState(null)

    const { data, isLoading, params, setParams } = useFetch(
        'https://www.omdbapi.com',
        { apiKey: '4244b12a', s: defaultSearch }
    )

    const handleOnSearch = (value) => {
        setParams({ ...params, s: value ? value : defaultSearch })
    }

    const ContentWrapper = styled('div')(() => ({
        paddingTop: '200px',
        width: '100%',
        textAlign: 'center'
    }));

    return (
        <ThemeProvider theme={theme}>
            <MovieModal open={modalShow} handleClose={() => setModalShow(false)} imdbID={imdbID} />
            <Header setParams={handleOnSearch} />
            <Container sx={{ py: "64px" }}>
                <Typography
                    variant="h4"
                    component="h1" my={4} color="primary">
                    Show your favorite movies
                </Typography>
                <Grid container spacing={3}>
                    {isLoading ?
                        (<ContentWrapper>
                            <CircularProgress
                                color="primary"
                                size={200}
                                style={{ textAlign: "center" }} />
                        </ContentWrapper>) :
                        data?.Search ? data?.Search?.map((obj, i) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3}
                                    key={`${obj?.imdbID}-${i}`}>
                                    <Movie
                                        title={obj?.Title}
                                        poster={obj?.Poster}
                                        year={obj?.Year}
                                        onClick={() => {
                                            setModalShow(true);
                                            setImdbID(obj?.imdbID)
                                        }} />

                                </Grid>
                            )
                        }) :
                            <ContentWrapper>
                                <Typography variant="h5">Movie Not Found!</Typography>
                            </ContentWrapper>
                    }
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default App;
