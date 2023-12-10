import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PagePet.css";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AppBar, Toolbar, Typography, Container } from '@mui/material';
;
const PetPage = () => {
  const [listpets, setListpets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPetList();
  }, []);

  const fetchPetList = async () => {
    try {
      const resultpets = await axios.get("http://localhost:8110/api/pet/get");
      setListpets(resultpets.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePet = async (idPet) => {
    try {
      const resultPet = await axios.delete(
        `http://localhost:8110/api/pet/delete/${idPet}`
      );

      if (resultPet.status === 200) {
        const updatedpets = listpets.filter(
          (pet) => pet._id !== idPet
        );
        setListpets(updatedpets);
        alert("Pet eliminada correctamente");
      } else {
        alert("Error al eliminar la Pet");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addPet = () => {
    navigate("/pets/addPet");
  };

  const detailPet = (idPet) => {
    navigate(`/pets/detailPet/${idPet}`);
  };

  const reviewPet = (idPet) => {
    navigate(`/reviews/${idPet}`);
  };

  const navigateToCrewBoard = () => {
    navigate("/pets");
  };

  return (
    <div>
      <div>
        <AppBar position="static" sx={{ backgroundColor: "#006b81" }}>
          <Container>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "whitesmoke" }}>
                Lista de Pets
              </Typography>
              <div className="buttonHeader">
                <Button color="inherit" onClick={navigateToCrewBoard}>
                  Crew Board
                </Button>
                <Button color="inherit" onClick={addPet}>
                  Add Pet
                </Button>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
        <div className="containerList">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Adopted</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listpets.map((pet, index) => (
                  <TableRow key={index}>
                    <TableCell>{pet.name}</TableCell>
                    <TableCell>{pet.type}</TableCell>
                    <TableCell>{pet.adopted}</TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => detailPet(pet._id)}>
                        Ver Pet
                      </Button>
                      <Button variant="outlined" onClick={() => deletePet(pet._id)}>
                        Eliminar Pet
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default PetPage;
