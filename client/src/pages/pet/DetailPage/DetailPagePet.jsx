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
  Toolbar
} from "@mui/material";

const DetailPagePet = () => {
  const [petData, setPetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const params = useParams();
  const petId = params.idPet;

  useEffect(() => {
    getPetData();
  }, []);

  const getPetData = async () => {
    try {
      const resultPetData = await axios.get(
        `http://localhost:8110/api/pet/get/${petId}`
      );

      if (!resultPetData.data) {
        console.log("La mascota no existe");
        navigatePetList();
        return;
      }

      setPetData(resultPetData.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const navigatePetList = () => {
    navigate("/pets");
  };

  const handleAdopt = async () => {
    try {
      const result = await axios.put(
        `http://localhost:8110/api/pet/adopt/${petId}`
      );

      if (result.status === 200) {
        // Actualizar el estado local si es necesario
        setPetData((prevData) => ({
          ...prevData,
          adopted: true,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    try {
      const result = await axios.put(
        `http://localhost:8110/api/pet/like/${petId}`
      );

      if (result.status === 200) {
        // Actualizar el estado local si es necesario
        setPetData((prevData) => ({
          ...prevData,
          likes: prevData.likes + 1,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const petList = () => {
    navigate("/pets");
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#006b81" }}>
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "whitesmoke" }}>
              Detail Pet Shelter
            </Typography>
            <div className="buttonHeader">
              <Button color="inherit" onClick={petList}>
                Pet Shelter List
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
                Detalles de la Mascota
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  <Typography variant="h5" gutterBottom>
                    {petData.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Tipo:</strong> {petData.type}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Descripción:</strong> {petData.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAdopt}
                    style={{ marginRight: "10px" }}
                    disabled={petData.adopted}
                  >
                    Adoptar
                  </Button>
                </>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {loading ? null : (
                <>
                  {petData.skills.map((skill, index) => (
                    <Typography key={index} variant="body1" gutterBottom>
                      <strong>Skill {index + 1}:</strong> {skill || "N/A"}
                    </Typography>
                  ))}
                  <Typography variant="body1" gutterBottom>
                    <strong>Adoptado:</strong> {petData.adopted ? "Sí" : "No"}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Likes:</strong> {petData.likes}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLike}
                  >
                    Like
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default DetailPagePet;
