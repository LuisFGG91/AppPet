import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
    {
        // Referencia al usuario que realizó la revisión
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        numberTreasure: {
            type: Number,
            required: true,
            min: [0, "Rating must be at least 0"],
            max: [10, "Rating cannot be more than 10"],
        },
        description: {
            type: String,
            required: true,
        },
        // Referencia a la película que se está revisando
        movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
        
    },
    {
        timestamps: true,
    }
);

ReviewSchema.statics.getReviewsWithUserDetails = async function (movieId) {
    try {
        const reviews = await this.find({ movie: movieId }).populate('user', 'firstName lastName _id');

        return reviews.map(review => ({
            ...review._doc,
            user: {
                firstName: review.user.firstName,
                lastName: review.user.lastName,
                _id: review.user._id
            }
        }));
    } catch (error) {
        throw error;
    }
};

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
