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

module.exports = router;
