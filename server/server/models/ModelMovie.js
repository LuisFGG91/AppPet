import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: [0, "Rating must be at least 0"],
      max: [10, "Rating cannot be more than 10"],
    },
    description: {
      type: String,
      required: true,
      minLength: [5, "Movie description must be at least 5 characters"],
    },
    // Referencia al usuario que creó la película
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Comentarios (revisiones) en la película
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
  },
  {
    timestamps: true,
  }
);
// Agrega un método para obtener las revisiones de una película específica
MovieSchema.methods.getReviews = async function () {
  await this.populate('reviews').execPopulate();
  return this.reviews;
};

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;
