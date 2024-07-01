maptilersdk.config.apiKey = maptilerApiKey;

const map = new maptilersdk.Map({
    container: 'mapI',
    style: maptilersdk.MapStyle.BRIGHT,
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 ,
    geolocateControl: false
});

new maptilersdk.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new maptilersdk.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)