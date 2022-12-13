/**
 * @jest-environment jsdom
 */

const express = require("express");
const app = express();
app.use(express.json());
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const geocode = require("./utils/geocode.js");
const { response } = require("express");
//pah config
const publicDirName = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
app.use(express.static(publicDirName));
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

const port = process.env.PORT || 5000;

app.get("/about", (req, res) => {
    res.render("about", {
        title: "This is the About Page!!!!!!",
        name: "Atul Verma",
    });
});

// console.log(address.value);
app.get("/", (req, res) => {
    res.render("weather", {
        name: "Atul Verma",
    });
    // console.log(req.body);
});
app.post("/", urlencodedParser, (req, res) => {
    const address = req.body.address;
    // console.log(address);
    const data = geocode(address, (error, data) => {
        if (error) return res.status(500).send(error);
        return res.render("weatherdata", {
            ...data,
            name: "Atul Verma",
        });
        // else res.send(data);
    });
});
// app.get("/weather", (req, res) => {
//   const address1 = req.query.q;
//   const data = geocode(address1, (error, data) => {
//     if (error) return res.send(error);
//     else response.send(data);
//   });
// });
app.listen(port, () => {
    console.log("Server Started on port " + port);
});