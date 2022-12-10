const express = require('express')
const https = require("https");
const app = express()
const port = 3000;
const ejs = require("ejs")

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index", {weatherIcon: "icons/sun.svg", location: "-------", temp: "-----", climate: "-----"});
});

app.post("/", function (req, res) {
    
    const query = req.body.cityName;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=c362f7b76745bdc3350a5aed853a09fc&units=metric";

    https.get(url, (response) => {

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temperature = Math.round(weatherData.main.temp);
            const weatherDesc = weatherData.weather[0].main;

            const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            
            res.render("index", {weatherIcon: icon, location: weatherData.name, temp: temperature, climate: weatherDesc});
        });
    });

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
