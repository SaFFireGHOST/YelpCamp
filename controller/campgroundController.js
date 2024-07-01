const Campground = require('../models/campground');

const { cloudinary } = require("../cloudinary");
const catchAsync = require('../utils/catchAsync');
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;


module.exports.getIndex=catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
   
    
})

module.exports.renderNewForm=(req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground=catchAsync(async (req, res) => {
    console.log(req.file)
    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.features[0].geometry;
    console.log(geoData.features[0].geometry)
    campground.author=req.user._id;
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    
    await campground.save();
    req.flash('success', 'Created new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
})

module.exports.showCampground=catchAsync(async (req, res,) => {
    try{
        const campground = await Campground.findById(req.params.id).populate({
            path:'reviews',
            populate:{path:'author'}
        }).populate('author');
      
        if (!campground) {
            req.flash('error', 'Cannot find that campground!');
            return res.redirect('/campgrounds');
        }
        res.render('campgrounds/show', { campground});
    }
    catch(e){
        req.flash('error', 'Cannot find that campground!');
            return res.redirect('/campgrounds');
    }
    
})

module.exports.renderEditForm=catchAsync(async (req, res) => {
    try{
        console.log("hiii");
        const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
    }
    catch(e){
        req.flash('error', 'Cannot find that campground!');
            return res.redirect('/campgrounds');
    }
    
})

module.exports.updateCampground=catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log(req.body,req.files)
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const images=req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...images)
    await campground.save()
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated the campground!');
    res.redirect(`/campgrounds/${campground._id}`)
})

module.exports.deleteCampground=catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the campground!');
    res.redirect('/campgrounds');
})