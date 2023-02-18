const mongoose = require("mongoose");
const { Cities } = require('../model/cities.model');
const atlasPlugin = require("mongoose-atlas-search");

const config = {
  connectionString: process.env.DB
}

exports.dbConnection = () => {
  mongoose
  .connect(config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connected succesfully");
  })
  .catch((err) => {
    console.log(err);
  });
}

exports.atlasInit = () => {
  atlasPlugin.initialize({
    model: Cities,
    overwriteFind: true,
    searchKey: "city",
    addFields: {
      city: "$city",
      country: "$country",
    },
    searchFunction: (query) => {
      return {
        wildcard: {
          query: `${query}*`,
          path: "city",
          allowAnalyzedField: true,
        },
      };
    },
  });
}