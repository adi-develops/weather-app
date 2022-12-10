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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));