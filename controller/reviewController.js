const Campground = require('../models/campground');
const Review = require('../models/review');


const catchAsync = require('../utils/catchAsync');


module.exports.createReview=catchAsync(async (req, res) => {
    const {id} = req.params
   
    const review = new Review(req.body.review);
    review.author=req.user._id;
    await review.save();
    const campground = await Campground.findById(id)
    campground.reviews.push(review);
    await campground.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/campgrounds/${id}`)
})

module.exports.deleteReview= catchAsync(async (req, res) => {
    const { id,reviewId } = req.params;
     await Review.findByIdAndDelete(reviewId);
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash('success', 'Successfully deleted the review!');
    res.redirect(`/campgrounds/${id}`);
})