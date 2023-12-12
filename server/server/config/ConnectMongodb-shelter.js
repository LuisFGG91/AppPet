import mongoose from "mongoose";

const createShelterConnect = () => {
  mongoose
    .connect("mongodb+srv://root:root@mern-pet.vqswutw.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("conectado a la BD correctamente");
    })
    .catch((e) => {
      console.log(e);
    });
};

export default createShelterConnect;
