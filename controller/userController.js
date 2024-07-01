
const User = require('../models/user');


const catchAsync = require('../utils/catchAsync');


module.exports.renderRegisterForm=(req, res) => {
    res.render('users/register');
}

module.exports.createUser=catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
})


module.exports.renderLoginForm= (req, res) => {
    res.render('users/login');
}

module.exports.login=(req, res) => {
    
    req.flash('success', 'Welcome to campgrounds!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl)
}

module.exports.logout=(req, res,next) => {
    req.logout((err)=>{
        if(err){
            return next(err);
        }
    });
    req.flash('success', "You have been succesfully logged out!");
    res.redirect('/campgrounds');
}