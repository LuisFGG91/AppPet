import mongoose from "mongoose";

const createShelterConnect = () => {
  mongoose
    .connect("mongodb://localhost/movie", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("conectado a la BD correctamente");
    })
    .catch((e) => {
      console.log(e);
    });
};

export default createShelterConnect;
