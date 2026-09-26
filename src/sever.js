require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");
const fileUpload = require("express-fileupload");

// lấy biến connection để dùng
const connection = require("./config/database");

// import express from 'express';
const app = express(); // app của express
const port = process.env.PORT || 8888; // để chạy được cần khai báo port
const hostname = process.env.HOST_NAME; // truy cập vào bộ nhớ env và lấy ra giá trị của biến HOST_NAME, mọi giá trị đều là chuỗi.

// config file upload
  app.use(fileUpload());  // check xem client có gửi request kèm dữ liệu file,... tới không, nếu có thì hứng lấy những file đó và cất vào req.files
  // để khi server có cần lấy thì sẽ query tới req.file để sử dụng.

// config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// config template engine
configViewEngine(app);

// config route
// khai báo route, nơi điều hướng các file routers (mỗi một URL được khai báo là 1 mở đầu cho 1 HTTP Request)
// Khai báo các tiền tố route (Prefix Routes) và điều hướng request tới các file Router tương ứng.
// Mỗi API (endpoint) (URL + HTTP Method) sẽ xử lý một yêu cầu HTTP Request cụ thể.
app.use("/", webRoutes); // URL dành cho website
app.use("/v1/api/", apiRoutes); // URL dành cho api (dữ liệu bên server)

// const cat = new Kitten({ name: "Gia Thai model" });
// cat.save(); // -> dùng khi cần save, sau khi save xong thì ghi chú lại để tránh việc save nhiều lần

(async () => {
  try {
    // test connection
    await connection();

    app.listen(port, hostname, () => {
      console.log(`Backend zero app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connect to DB: ", error);
  }
})();

// bên file server chỉ có nhiệm vụ là gọi, lấy ra mọi thông tin cần chạy trên server mà không cần phải khởi tạo dữ liệu
// lấy mọi dữ liệu từ các file khác, tóm lại server.js là trang chính để kiểm soát mọi request.
