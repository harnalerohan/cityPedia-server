const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  city: String,
  city_ascii: String,
  lat: String,
  lng: String,
  country: String,
  iso2: String,
  iso3: String,
  admin_name: String,
  capital: String,
  population: Number,
  id: Number,
}, {collection: 'cities'});

//model
exports.Cities = mongoose.model("Cities", citySchema);