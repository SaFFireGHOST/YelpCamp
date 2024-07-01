const express = require('express');

const Review = require('../models/review');
const Campground = require('../models/campground');
const { campgroundSchema,reviewSchema } = require('../schemas.js');
const reviewController = require('../controller/reviewController');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const { isLoggedIn ,validateReview,isReviewAuthor,isLoggedIn_2} = require('../middleware');
const router = express.Router({ mergeParams: true });




router.post('/',isLoggedIn_2,validateReview,reviewController.createReview);



router.delete('/:reviewId',isLoggedIn,isReviewAuthor,reviewController.deleteReview)



module.exports = router;