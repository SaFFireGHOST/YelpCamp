const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const axios = require('axios');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const getImages = async () => {
    try {
        // console.log("hi");
      const id= '9V6tXpw_q1TNlVCfbDU0qw6NPYyS8azcPAi4LEakOV8' ;
      const res = await axios.get(`https://api.unsplash.com/collections/483251/photos`,{params:{client_id:id ,per_page:50}});
    //   const index = Math.floor(Math.random() * 100);
    //   console.log(res.data[index].urls.regular)
    return res.data.map(photo=>photo.urls.regular)
    
    } catch (e) {
      return "NO JOKES AVAILABLE! SORRY :(";
    }
  };


const seedDB = async () => {
    await Campground.deleteMany({});
    const photos = await getImages();
    // console.log(photos)
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20)+10
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            author : '667af41af3296e3f4c994bee',
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, sit iure eius aut quos delectus unde quae inventore ab rerum eveniet modi facere consectetur excepturi velit fuga, tempora quas consequatur!',
            images:[
                {
                    url: 'https://res.cloudinary.com/dg3zibdav/image/upload/v1719504580/YelpCamp/spadwvcej3hi4vynwmsp.jpg',
                    filename:  'YelpCamp/spadwvcej3hi4vynwmsp'  
                },
                {
                    url: 'https://res.cloudinary.com/dg3zibdav/image/upload/v1719504580/YelpCamp/wbifwp2z4stsflnleoqm.webp',
                    filename:  'YelpCamp/wbifwp2z4stsflnleoqm'
                }
            ],
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            }
            
        })
       
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})