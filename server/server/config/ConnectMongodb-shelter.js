import mongoose from "mongoose";

const createShelterConnect = () => {
  mongoose
    .connect("mongodb://localhost:27017/movie", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("conectado a la BD correctamente");
    })
    .catch((e) => {
      console.log(e);
    });
};

export default createShelterConnect;
