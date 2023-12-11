import mongoose from "mongoose";

const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "El nombre de la mascota debe tener al menos 3 caracteres"],
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: [3, "La descripción de la mascota debe tener al menos 3 caracteres"],
    },
    skills: [
      {
        type: String,
      },
    ],
    adopted: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Pet = mongoose.model("Pet", PetSchema);
export default Pet;
