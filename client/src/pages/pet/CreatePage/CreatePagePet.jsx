import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppBar, Container, Toolbar,Button, TextField, TextareaAutosize, Grid, Paper, Typography, Box } from '@mui/material';
import axios from "axios";
import "./CreatePagePet.css";

const PetCreatePage = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");
  const navigate = useNavigate();


  const createPet = async () => {
    if (name === "" || type === "" || description === "") {
      alert("Completa los datos de la mascota");
      return;
    }

    let petObjData = {
      name: name,
      type: type,
      description: description,
      skills: [skill1, skill2, skill3]
    };

    try {
      let responseCreate = await axios.post(
        "http://localhost:8110/api/pet/create",
        petObjData
      );

      if (responseCreate.status === 200) {
        const createdPetId = responseCreate.data._id;
        navigate("/pets");
        setName("");
        setType("");
        setDescription("");
        setSkill1("");
        setSkill2("");
        setSkill3("");
      }
    } catch (e) {
      console.log(e.response.data.message);
      alert(e.response.data.message);
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
              Add Pet
            </Typography>
            <div className="buttonHeader">
              <Button color="inherit" onClick={petList}>
                Pet List
              </Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <Box display="flex" justifyContent="center" mt={4}>
        <Paper elevation={3} style={{ padding: "20px", maxWidth: "600px" }}>
          <Grid container spacing={3}>
            {/* Primera Columna */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" align="center">
                Pet Details
              </Typography>
              <TextField
                label="Pet Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
              <TextField
                label="Pet Type"
                fullWidth
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
              <TextareaAutosize
                minRows={3}
                maxRows={10}
                placeholder="Description"
                style={{ width: '100%', marginBottom: '10px' }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

            {/* Segunda Columna */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Skills</Typography>
              <TextField
                label="Skill 1"
                fullWidth
                value={skill1}
                onChange={(e) => setSkill1(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
              <TextField
                label="Skill 2"
                fullWidth
                value={skill2}
                onChange={(e) => setSkill2(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
              <TextField
                label="Skill 3"
                fullWidth
                value={skill3}
                onChange={(e) => setSkill3(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button variant="contained" onClick={createPet} style={{ marginTop: "10px" }}>
              Add Pet
            </Button>
          </Box>

        </Paper>
      </Box>

    </div>
    
  );
};

export default PetCreatePage;
