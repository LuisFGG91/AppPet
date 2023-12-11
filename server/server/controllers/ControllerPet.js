import Pet from "../models/ModelPet.js";

const createPet = async (req, res) => {
  try {
    let petData = req.body;
    let newPet = await Pet.create(petData);
    res.status(200).json(newPet);
  } catch (e) {
    console.log("error: " + e);
    res.status(400).json({
      message: e.message,
    });
  }
};
const getPets = async (req, res) => {
  let petList = await Pet.find();
  res.status(200).json(petList);
};
const getOnePet = async (req, res) => {
  try {
    let id = req.params.idPet;
    let petFound = await Pet.findById(id);
    console.log(petFound);
    res.status(200).json(petFound);
  } catch (e) {
    console.log(e);
  }
};
const deletePet = async (req, res) => {
  let id = req.params.idPet;
  let petDelete = await Pet.findByIdAndDelete(id);
  console.log(petDelete);
  res.status(200).json("pet borrado");
};
const adoptPet = async (req, res) => {
  try {
    const id = req.params.idPet;
    const updatedPet = await Pet.findByIdAndUpdate(id, { adopted: true }, { new: true });

    if (!updatedPet) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    res.status(200).json(updatedPet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al adoptar la mascota" });
  }
};
const likePet = async (req, res) => {
  try {
    const id = req.params.idPet;
    const updatedPet = await Pet.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });

    if (!updatedPet) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    res.status(200).json(updatedPet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al dar like a la mascota" });
  }
};
export { createPet, getPets, getOnePet, deletePet, adoptPet, likePet };
