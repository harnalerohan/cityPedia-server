const { Cities } = require("../model/cities.model");

exports.citySearch7 = async(req, res) => {
  try {
    const resultWithSearch = await Cities.find({
      city: req.params.query,
    }).limit(7); //aggregation is used
    return res.send(resultWithSearch);
  } catch (err) {
    console.log(err);
  }
}

exports.citySearch20 = async(req, res) => {
  try {
    const resultWithSearch = await Cities.find({ city: req.params.city }).limit(
      20
    ); //aggregation is used
    return res.send(resultWithSearch);
  } catch (err) {
    console.log(err);
  }
}