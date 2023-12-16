import { useNavigate } from "react-router-dom";
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
import "./CreatePageMovie.css"; // Asegúrate de tener tu archivo de estilos
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../../component/NavBar';

const CreatePageMovie = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const createMovie = async () => {
    if (title === "" || rating === "" || description === "") {
      alert("Completa los datos de la película");
      return;
    }

    let movieObjData = {
      title: title,
      rating: parseFloat(rating), // Asegúrate de que rating sea un número
      description: description,
      createdBy: user._id,
    };

    try {
      let responseCreate = await axios.post(
        "http://localhost:8110/api/movie/create",
        movieObjData
      );

      if (responseCreate.status === 200) {
        const createdMovieId = responseCreate.data._id;
        navigate("/movies");
        setTitle("");
        setRating("");
        setDescription("");
      }
    } catch (e) {
      console.log(e.response.data.message);
      alert(e.response.data.message);
    }
  };

  const movieList = () => {
    navigate("/movies");
  };

  return (
    <div>
      <Navbar pageTitle="List de Movies" />
      <Container fixed style={{ marginTop: '20px', marginBottom: '20px' }}>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={10}>
            <Typography variant="h4">Add Movies </Typography>
          </Grid>
        </Grid> 
        <Box display="flex" justifyContent="center" mt={4}>
          <Paper elevation={3} style={{ padding: "20px", maxWidth: "600px" }}>
            <Grid container spacing={3}>
              {/* Primera Columna */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" align="center">
                  Movie Details
                </Typography>
                <TextField
                  label="Movie Title"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                <TextField
                  label="Movie Rating"
                  fullWidth
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                <TextareaAutosize
                  minRows={3}
                  maxRows={10}
                  placeholder="Description"
                  style={{ width: "100%", marginBottom: "10px" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
            </Grid>

            <Box mt={2}>

              <Button variant="contained" onClick={createMovie} style={{ marginTop: "10px", marginRight: "10px" }}>
                Add Movie
              </Button>

              <Button variant="contained" color="secondary" onClick={movieList} style={{ marginTop: "10px" }} >
                Cancelar
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default CreatePageMovie;
