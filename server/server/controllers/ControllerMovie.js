import Movie from "../models/ModelMovie.js";
import Review from "../models/ModelReview.js";

// Función para crear una película
const createMovie = async (req, res) => {
  try {
    let movieData = req.body;
    let newMovie = await Movie.create(movieData);
    res.status(200).json(newMovie);
  } catch (e) {
    console.log("error: " + e);
    res.status(400).json({
      message: e.message,
    });
  }
};

// Función para obtener todas las películas
const getMovies = async (req, res) => {
  try {
    // Obtén la lista de películas
    let movieList = await Movie.find();

    // Itera sobre cada película y calcula el promedio de las revisiones asociadas
    for (let i = 0; i < movieList.length; i++) {
      const movie = movieList[i];

      // Obtiene todas las revisiones asociadas a la película
      const reviews = await Review.find({ movie: movie._id });

      // Calcula el promedio de numberTreasure
      const totalNumberTreasure = reviews.reduce((total, review) => total + review.numberTreasure, 0);
      const avgNumberTreasure = reviews.length > 0 ? totalNumberTreasure / reviews.length : 0;
      const roundedAvgNumberTreasure = Number(avgNumberTreasure.toFixed(1));
      // Agrega el promedio al objeto de película
      movieList[i] = {
        ...movieList[i]._doc,
        avgReview: roundedAvgNumberTreasure,
      };
    }

    res.status(200).json(movieList);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Error al recuperar las películas",
    });
  }
};

// Función para obtener una película por su ID
const getOneMovie = async (req, res) => {
  try {
    let id = req.params.idMovie;
    let movieFound = await Movie.findById(id);
    res.status(200).json(movieFound);
  } catch (e) {
    console.log(e);
    res.status(404).json({
      message: "Película no encontrada",
    });
  }
};

// Función para actualizar una película por su ID
const updateMovie = async (req, res) => {
  try {
    let id = req.params.idMovie;
    let updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedMovie);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Error al actualizar la película",
    });
  }
};

// Función para eliminar una película por su ID
const deleteMovie = async (req, res) => {
  const { idMovie } = req.params;
  try {
    const movie = await Movie.findById(idMovie);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    await Movie.findByIdAndDelete(idMovie);
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createMovie, getMovies, getOneMovie, updateMovie, deleteMovie };
