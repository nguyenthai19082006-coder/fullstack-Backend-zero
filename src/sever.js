require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");

// lấy biến connection để dùng
const connection = require("./config/database");

// import express from 'express';
const app = express(); // app của express
const port = process.env.PORT || 8888; // để chạy được cần khai báo port
const hostname = process.env.HOST_NAME; // truy cập vào bộ nhớ env và lấy ra giá trị của biến HOST_NAME, mọi giá trị đều là chuỗi.

// console.log(process.env);

// config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// config template engine
configViewEngine(app);

// khai báo route
app.use("/", webRoutes);

// A simple SELECT query
// connection.query("SELECT * from Users u ", function (err, results, fields) {
//   console.log(">>> results = ", results); // results contains rows returned by server
// });

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});

// bên file server chỉ có nhiệm vụ là gọi, lấy ra mọi thông tin cần chạy trên server mà không cần phải khởi tạo dữ liệu
// lấy mọi dữ liệu từ các file khác, tóm lại server.js là trang chính để kiểm soát mọi request.
