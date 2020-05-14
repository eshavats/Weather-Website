const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    
    res.render("index", {
        title: "Weather App",
        name: "Esha Vats"
    });

});

app.get("/about", (req, res) => {

    res.render("about", {
        title: "About Me",
        name: "Esha Vats"
    });
});

app.get("/help", (req, res) => {
    
    res.render("help", {
        title: "Help Page",
        name: "Esha Vats",
        message: "This is a help page."
    });

});

app.get("/weather", (req, res) => {

    if(!req.query.address)
    {
        return res.send({
            error: "You must provide an address."
        });
    }

    geocode(req.query.address, (error, data) => {
        
        if(error)
        {
            return res.send({
                error
            });
        }    
        
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            
            if(error)
            {
                return res.send({
                    error
                });
            }

            res.send({
                location: data.location,
                forecast: forecastData,
                address: req.query.address
            });

        });
    });

});

app.get("/help/*", (req, res) => {
    res.render("error", {
        title: "404!",
        errorMessage: "Help article not found!"
    });
});

app.get("*", (req, res) => {
    res.render("error", {
        title: "404!",
        name: "Esha Vats",
        errorMessage: "Page not found!"
    });
});

app.listen(3000, () => {
    
    console.log("Server is up on port 3000.");
    
});