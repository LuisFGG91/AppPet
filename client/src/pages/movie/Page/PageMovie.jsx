import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container,Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography ,} from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../../component/NavBar';


const MoviePage = () => {
  const { logout, user } = useAuth();
  const [listMovies, setListMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieList();
  }, []);

  const fetchMovieList = async () => {
    try {
      const resultMovies = await axios.get("http://localhost:8110/api/movie/get");
      const moviesWithCreator = resultMovies.data.map(movie => {
        return {
          ...movie,
          createdByCurrentUser: user && movie.createdBy === user._id,
        };
      });
      setListMovies(moviesWithCreator);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (idMovie) => {
    try {
      const resultMovie = await axios.delete(
        `http://localhost:8110/api/movie/${idMovie}`
      );

      if (resultMovie.status === 200) {
        const updatedMovies = listMovies.filter(
          (movie) => movie._id !== idMovie
        );
        setListMovies(updatedMovies);
        alert("Movie eliminada correctamente");
      } else {
        alert("Error al eliminar la Movie");
      }
    } catch (error) {
      alert("Error al eliminar la Movie", error );
      console.error(error);
    }
  };

  const addMovie = () => {
    navigate("/movies/addMovie");
  };

  const detailMovie = (idMovie) => {
    navigate(`/movies/detailMovie/${idMovie}`);
  };

  const addReviewMovie = (idMovie, nameMovie) => {
    navigate(`/movies/${idMovie}/addReview`, { state: { nameMovie } });
  };


  return (
    <div>
      <div>
        <Navbar pageTitle="List de Movies" />
          <Container fixed style={{ marginTop: '20px', marginBottom: '20px' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={10}>
                  <Typography variant="h4">Lists Movies </Typography>
              </Grid>
              <Grid item xs={2}>
              <Button variant="contained" color="primary" onClick={addMovie} sx={{backgroundColor: "#00a3c3",position: "relative",overflow: "hidden"}}>
                Add Movie
              </Button>

              </Grid>
            </Grid> 
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listMovies.map((movie, index) => (
                    <TableRow key={index}>
                      <TableCell>{movie.title}</TableCell>
                      <TableCell>{movie.avgReview !== 0 ? movie.avgReview : movie.rating}</TableCell>
                      <TableCell>
                        <Button variant="outlined" onClick={() => detailMovie(movie._id)}>
                          Read Reviews
                        </Button>
                        <Button variant="outlined" onClick={() => addReviewMovie(movie._id, movie.title)}>
                          Write a Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </div>
      </div>
  );
};

export default MoviePage;