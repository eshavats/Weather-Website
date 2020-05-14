const request = require("request");

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZXNoYXZhdHMiLCJhIjoiY2thMm50MjliMDUzajNrbGttY3IwenpucSJ9.apNRd1LhYT9gy90OUKf8Qg&limit=1";

    request({ url: url, json: true }, (error, response) => {
    
            if(error)
            {
                callback("Unable to connect to geolocation service!", undefined);       
            }
            else if(response.body.features.length === 0)
            {
                callback("Unable to find the coordinates!", undefined);        
            }
            else
            {
                const [ longitude, latitude ] = response.body.features[0].center;
                callback(undefined, {
                    latitude, 
                    longitude,
                    location: response.body.features[0].place_name
                });
            }
        });

};

module.exports = geocode;