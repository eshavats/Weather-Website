const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=3e23b3087b80e572e6fc7fa2cf17dad3&query=" + latitude + "," + longitude;

    request({ url: url, json: true }, (error, response) => {

        if(error)
        {
            callback("Unable to connect to weather service!", undefined);
        }
        else if(response.body.error)
        {
            callback("Unable to find location!", undefined);        
        }
        else
        {
            const { temperature, feelslike, weather_descriptions } = response.body.current;
            callback(undefined, weather_descriptions[0] + ". It's currently " + temperature + " degrees out. Feels like " + feelslike + " degrees out.");    
        }
    
    });
};

module.exports = forecast;