const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { dbConnection, atlasInit } = require("./src/config/dbConfig");
const cityRouter = require("./src/router/cities.router");
const app = express();
var Parse = require('parse/node');

//middlewares
app.use(cors());
app.use(bodyParser.json());

//db connection
dbConnection();
//atlasPlugin.initialize(<options>);
atlasInit();
Parse.initialize("n71OygLkOAu8IwTbCBpJKqJa2sMnX3R1XmxOOxPf","Msh0hbTYKuRnaShbrMebZhReOoIInUjZjSRru47V"); 
Parse.serverURL = 'https://parseapi.back4app.com/'

//actual routes
app.use(cityRouter);

//listener
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "You are inside root route",
  });
});

app.listen(port, () => {
  console.log(`Server started succesfully on ${port}`);
});
