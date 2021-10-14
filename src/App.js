import { useState, useEffect, useMemo } from 'react';
import theme from './Theme';
import { Movie, Header } from 'components';
import { ThemeProvider } from '@emotion/react';
import { Container, Grid, Typography } from '@mui/material';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('man');
  const fetchData = (search) => {
    axios
      .get(`https://www.omdbapi.com/?s=${search}&apikey=4244b12a`)
      .then((res) => setData(res.data.Search))
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchData(search)
  }, [search])

  const debounce = (func, timeout = 1000) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
  const setSearchValue = useMemo(
    () => debounce((value) => setSearch(value)),
    [setSearch]
)
  const handleSearch = (e) => {
    const value = e.target.value;
    if (value!== '') {
      setSearchValue(value);
    }
    else {
      setSearchValue("man")
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Header onSearch={handleSearch} />
      <Container>

      <Typography variant="h3" component="h1" my={4} color="primary">Show your favorite movies</Typography>
        <Grid container spacing={3}>
          {data?.map((obj, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={`${obj.imdbI}-${i}`}>
                <Movie title={obj.Title} poster={obj.Poster} year={obj.Year} />
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
