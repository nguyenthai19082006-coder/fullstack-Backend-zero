require("dotenv").config();
const mongoose = require("mongoose");

const connection = async () => {
  try {
    const options = {
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME,
    };

    await mongoose.connect(process.env.DB_HOST, options);
    console.log("connect success");
  } catch (error) {
    // handleError(error); -> hàm này sẽ chứa lỗi, nếu cần dùng thì tạo hàm như này và chứa lỗi
    console.log(">>> Error connection DB: ", error);
  }
};

module.exports = connection;
