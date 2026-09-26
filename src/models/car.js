const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const Car = mongoose.model("car", carSchema);

module.exports = Car;
