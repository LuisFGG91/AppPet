import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  TextField,
  TextareaAutosize,
  Grid,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../../component/NavBar';

const CreatePageReview = ( ) => {
  const { nameMovie } = useLocation().state || { nameMovie: '' };
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const navigate = useNavigate();
  const { idMovie } = useParams(); // Obtén el idMovie de los parámetros de la URL

  const createReview = async () => {
    if (content === "" || rating === "") {
      alert("Completa los datos de la reseña");
      return;
    }

    const reviewObjData = {
      user: user._id, // Puedes obtener esto del estado de autenticación o de donde lo tengas
      numberTreasure: parseFloat(rating), // Ajusta el nombre según tu modelo de MongoDB
      description: content,
      movie: idMovie, // Utiliza el idMovie de los parámetros de la URL
    };

    try {
      const responseCreate = await axios.post(
        `http://localhost:8110/api/movie/${idMovie}/review/create`,
        reviewObjData
      );

      if (responseCreate.status === 200) {
        const createdReviewId = responseCreate.data._id;
        navigate(`/movies/detailMovie/${idMovie}`); // Ajusta la URL según tu estructura de rutas
        setContent("");
        setRating("");
      }
    } catch (e) {
      console.log(e.response.data.message);
      alert(e.response.data.message);
    }
  };

  const movieDetails = () => {
    navigate(`/movies`); // Ajusta la URL según tu estructura de rutas
  };

  return (
    <div>
      <Navbar pageTitle="List de Movies" />
      <Box display="flex" justifyContent="center" mt={4}>        
        <Paper elevation={3} style={{ padding: "20px", maxWidth: "600px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" align="left">
                Add Review Details { nameMovie }
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                minRows={3}
                maxRows={10}
                placeholder="Review Content"
                style={{ width: "100%", marginBottom: "10px" }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <TextField
                label="Rating"
                fullWidth
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button variant="contained" onClick={createReview} style={{ marginTop: "10px", marginRight: "10px" }}>
              Add Review
            </Button>
            <Button variant="contained" color="secondary" onClick={movieDetails} style={{ marginTop: "10px" }} >
              Cancelar
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default CreatePageReview;
