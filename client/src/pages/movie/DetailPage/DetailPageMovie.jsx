import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  CircularProgress,
  AppBar,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAuth } from '../../../context/AuthContext';

const DetailPageMovie = () => {
  const { user } = useAuth();
  const [movieData, setMovieData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const params = useParams();
  const movieId = params.idMovie;

  useEffect(() => {
    getMovieData();
    getMovieReviews();
  }, []);

  const getMovieData = async () => {
    try {
      const resultMovieData = await axios.get(
        `http://localhost:8110/api/movie/${movieId}`
      );

      const movieData = resultMovieData.data;

      if (!movieData) {
        console.log("La película no existe");
        navigateMovieList();
        return;
      }

      const movieWithCreator = {
        ...movieData,
        createdByCurrentUser: user && movieData.createdBy === user._id,
      };

      setMovieData(movieWithCreator);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getMovieReviews = async () => {
    try {
      const resultReviews = await axios.get(
        `http://localhost:8110/api/movie/${movieId}/review/get`
      );
      const reviewWithCreator = resultReviews.data.map(review => {
        return {
          ...review,
          createdByCurrentUser: user && review.user._id === user._id,
        };
      });

      

      setReviews(reviewWithCreator);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteReview = async (idMovie,idReview ) => {
    try {
      const resultReview = await axios.delete(
        `http://localhost:8110/api/movie/${idMovie}/review/delete/${idReview}`
      );

      if (resultReview.status === 200) {
        const updatedReviews = reviews.filter(
          (review) => review._id !==  idReview
        );
        setReviews(updatedReviews);
        alert("Review eliminada correctamente");
      } else {
        alert("Error al eliminar la Review");
      }
    } catch (error) {
      alert("Error al eliminar la Review", error);
      console.error(error);
    }
  };
  const navigateMovieList = () => {
    navigate("/movies");
  };

  const deleteMovie = async (idMovie) => {
    try {
      const resultMovie = await axios.delete(
        `http://localhost:8110/api/movie/${idMovie}`
      );

      if (resultMovie.status === 200) {
        navigateMovieList()
        alert("Movie eliminada correctamente");
      } else {
        alert("Error al eliminar la Movie");
      }
    } catch (error) {
      alert("Error al eliminar la Movie", error);
      console.error(error);
    }
  };
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#006b81" }}>
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "whitesmoke" }}>
              Detail Movie
            </Typography>
            <div className="buttonHeader">
              <Button color="inherit" onClick={navigateMovieList}>
                Movie List
              </Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Detail movie
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  <Typography variant="h5" gutterBottom>
                    {movieData.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Rating:</strong> {movieData.rating}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Descripción:</strong> {movieData.description}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                Reviews
              </Typography>
              {loading ? null : (
                <>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>User</TableCell>
                          <TableCell>Rating</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {reviews.map((review, index) => (
                          <TableRow key={index}>
                            <TableCell>{review.user.firstName}</TableCell>
                            <TableCell>{review.numberTreasure}</TableCell>
                            <TableCell>{review.description}</TableCell>
                            <TableCell>
                              {review.createdByCurrentUser && (
                                <Button variant="outlined" onClick={() => deleteReview(movieData._id, review._id )}>
                                  Delete Review
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </Grid>
          </Grid>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
                {movieData.createdByCurrentUser && (
                  <Button variant="outlined" onClick={() => deleteMovie(movieData._id)}>
                    Delete Movie
                  </Button>
                )}
             </>
          )}

        </Paper>
      </Container>
    </div>
  );
};

export default DetailPageMovie;
