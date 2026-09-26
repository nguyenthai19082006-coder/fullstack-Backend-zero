const mongoose = require("mongoose");

// connect to Database
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  city: String,
});

const User = mongoose.model("user", userSchema);

module.exports = { User };

// schema: định dạng hình thức cho database.
