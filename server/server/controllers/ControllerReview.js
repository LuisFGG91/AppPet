import Review from "../models/ModelReview.js";

const createReview = async (req, res) => {
  try {
    const { idMovie } = req.params;
    const reviewData = { ...req.body, movie: idMovie };
    const newReview = await Review.create(reviewData);
    res.status(200).json(newReview);
  } catch (e) {
    console.log("error: " + e);
    res.status(400).json({
      message: e.message,
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const { idMovie } = req.params;
    const reviewList = await Review.getReviewsWithUserDetails(idMovie);
    res.status(200).json(reviewList);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const getOneReview = async (req, res) => {
  try {
    const { idReview } = req.params;
    const reviewFound = await Review.findById(idReview);
    res.status(200).json(reviewFound);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { idReview } = req.params;
    const reviewDelete = await Review.findByIdAndDelete(idReview);
    console.log(reviewDelete);
    res.status(200).json("Revisión borrada");
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export { createReview, getReviews, getOneReview, deleteReview };
