import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PagePet.css";
import { CheckCircleOutline, RadioButtonUnchecked } from '@mui/icons-material';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';

const PetPage = () => {
  const { logout } = useAuth();
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

  const userLogout = async () => {
    try {
      // Llamada al backend para cerrar sesión
      await axios.post('http://localhost:8110/api/user/logout');
      logout();
      // Redirección a la lista de mascotas
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <div>
        <AppBar position="static" sx={{ backgroundColor: "#006b81" }}>
          <Container>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "whitesmoke" }}>
                List de Pets Shelter
              </Typography>
              <div className="buttonHeader">
                <Button color="inherit" onClick={userLogout}>
                 Logout
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
                    <TableCell>
                      {pet.adopted ? (
                        <CheckCircleOutline style={{ color: 'green' }} />
                      ) : (
                        <RadioButtonUnchecked style={{ color: 'red' }} />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => detailPet(pet._id)}>
                        Show Pet
                      </Button>
                      <Button variant="outlined" onClick={() => deletePet(pet._id)}>
                        Delete Pet
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
