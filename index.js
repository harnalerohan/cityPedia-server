const express = require("express");
require('dotenv').config()
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const atlasPlugin = require('mongoose-atlas-search');

const app = express();

//middlewares
app.use(cors())
app.use(bodyParser.json())

//db connection
const db = process.env.DB

mongoose.connect(db, {
  useNewUrlParser : true,
  useUnifiedTopology: true,
  useCreateIndex : true
}).then(() => {
  console.log("DB connected succesfully")
}).catch((err) => {
  console.log(err)
})

//schema
const citySchema = new mongoose.Schema({
  city: String,
  city_ascii: String,
  lat: String,
  lng: String,
  country: String,
  iso2: String,
  iso3:String,
  admin_name: String,
  capital: String,
  population: Number,
  id: Number
})

//model
const Cities = mongoose.model("Cities", citySchema)

//atlasPlugin.initialize(<options>);

atlasPlugin.initialize({
  model: Cities,
  overwriteFind: true,
  searchKey: 'city',
  addFields:{
    city: '$city',
    country: '$country'
  },
  searchFunction: query => {
    return {
      "wildcard": {
        "query": `${query}*`,
        "path": "city",
        "allowAnalyzedField" : true
      }
    }
  }
})

//actual routes
app.get("/cities/:query", (req, res) => {

  (async () => {
    try{
      const resultWithSearch = await Cities.find({city: req.params.query}).limit(7) //aggregation is used
      res.send(resultWithSearch)
    }catch(err){
      console.log(err)
    }
  })();
})

app.get("/search/:city", (req, res) => {
  (async () => {
    try{
      const resultWithSearch = await Cities.find({city: req.params.city}).limit(20) //aggregation is used
      console.log(resultWithSearch);
      res.send(resultWithSearch)
    }catch(err){
      console.log(err)
    }
  })();
})

//listener
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "You are inside root route"
  })
})

app.listen(port, () => {
  console.log(`Server started succesfully on ${port}`)
})