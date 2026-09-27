const express = require("express");
const {
  getHomepage,
  getABC,
  getHoiDanIT,
  getCreateUser,
  postCreateUser,
  getUpdateUser,
  succeedUpdate,
  deleteUser,
} = require("../controllers/homeController");

// lấy dữ liệu của car
const {
  getCars,
  getCreate,
  createCar,
  updateCars,
  finishUpdate,
  deleteCars,
} = require("../controllers/carControllers");

// lấy dữ liệu của products
// const {
//   getProducts,
//   getCreatePrd,
//   CreatePrd,
//   updatePrd,
//   successfulUpdate,
//   succeedDeleted,
// } = require("../controllers/productControllers");

const router = express.Router();

router.get("/", getHomepage);

router.get("/abc", getABC);

router.get("/hoidanit", getHoiDanIT);

// tạo mới dữ liệu
router.get("/create", getCreateUser);

router.post("/create-user", postCreateUser);

router.get("/update/:id", getUpdateUser);

router.post("/succeedUpdate/:id", succeedUpdate);

router.post("/delete-user/:id", deleteUser);

// tạo 1 route để phục vụ cho project mini về MVC
// router.get("/products", getProducts);

// router.get("/products/create", getCreatePrd);

// router.post("/products/create-prd", CreatePrd);

// router.get("/products/update-prd/:id", updatePrd);

// router.post("/products/finishUpdate/:id", successfulUpdate);

// router.get("/products/delete-prd/:id", succeedDeleted);

// tạo 1 đường dẫn cho dự án car
router.get("/cars", getCars);

// Khi truy cập URL /cars/create sẽ gọi hàm getCreate
router.get("/cars/create", getCreate);

// gửi dữ liệu đến địa chỉ /cars/create và gọi createCar ra xử lý
router.post("/cars/create-car", createCar);

// update dữ liệu car
router.get("/cars/updateCars/:id", updateCars);

router.post("/cars/finishUpdate/:id", finishUpdate);

router.get("/cars/delete/:id", deleteCars);

module.exports = router;
