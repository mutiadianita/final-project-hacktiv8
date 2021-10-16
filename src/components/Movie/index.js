import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia
} from '@mui/material';

const Movie = ({ poster, title, year, onClick }) => {
  const [raised, setRaised] = useState(false)
  return (
    <Card
      style={{ cursor: "pointer" }}
      raised={raised}
      onMouseOver={() => setRaised(true)}
      onMouseOut={() => setRaised(false)}
      onClick={onClick}
    >
      <CardHeader
        title={title}
        subheader={year}
        sx={{ height: 88 }}
      />
      <CardMedia
        component="img"
        height="480"
        image={poster}
        alt={title}
      />
    </Card>
  );
}
export default Movie;
