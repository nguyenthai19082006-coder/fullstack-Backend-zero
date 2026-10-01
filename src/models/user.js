const mongoose = require("mongoose");
const mongoose_delete = require('mongoose-delete');

// connect to Database
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  city: String,
});

const User = mongoose.model("user", userSchema);

userSchema.plugin(mongoose_delete);

module.exports = { User };

// schema: định dạng hình thức cho database.
