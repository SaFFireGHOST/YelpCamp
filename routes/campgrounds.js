const express = require('express');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');

const campgroundController = require('../controller/campgroundController');
const multer  = require('multer');
const { cloudinary,storage } = require('../cloudinary');
const upload = multer({ storage });
const { isLoggedIn,validateCampground,isAuthor } = require('../middleware');

const router = express.Router();






router.route('/')
    .get(campgroundController.getIndex)
    .post(isLoggedIn, upload.array('images'), validateCampground,campgroundController.createCampground)

router.get('/new',isLoggedIn, campgroundController.renderNewForm);





router.route('/:id')
    .get(campgroundController.showCampground)
    .put(isLoggedIn,isAuthor,upload.array('images'), campgroundController.updateCampground)
    .delete(isLoggedIn,isAuthor,campgroundController.deleteCampground);

router.get('/:id/edit',isLoggedIn,isAuthor, campgroundController.renderEditForm);

module.exports = router;