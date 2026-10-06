const express = require("express");
const {
  getUsersAPI,
  createUsersAPI,
  putUsersAPI,
  deleteUsersAPI,
  postUploadSingleFileApi,
  postUploadMultipleFileApi,
} = require("../controllers/apiController");

const {
  postCreateCustomerAPI,
  postCreateArrayCustomer,
  getArrayCustomer,
  putUpdateCustomerAPI,
  deleteCustomerAPI,
  deleteArrayCustomer,
} = require("../controllers/customerController");

const {
  postCreateProductAPI,
  getArrayProductAPI,
  postCreateProduct,
  postCreateArrayProduct,
  putUpdateProduct,
  deleteAProduct,
  deleteArrayProduct,
} = require("../controllers/productControllers");

const routerAPI = express.Router();

// User
routerAPI.get("/users", getUsersAPI);

routerAPI.post("/users", createUsersAPI);

routerAPI.put("/users", putUsersAPI);

routerAPI.delete("/users", deleteUsersAPI);

// File
routerAPI.post("/file", postUploadSingleFileApi);

routerAPI.post("/files", postUploadMultipleFileApi);

// Customer
routerAPI.get("/customers", getArrayCustomer);

routerAPI.post("/customers", postCreateCustomerAPI);

routerAPI.post("/customers-many", postCreateArrayCustomer);

routerAPI.put("/customers", putUpdateCustomerAPI);

routerAPI.delete("/customers", deleteCustomerAPI);

routerAPI.delete("/customers-many", deleteArrayCustomer);

// Product
routerAPI.post("/fileProducts", postCreateProductAPI);

routerAPI.get("/products", getArrayProductAPI);

routerAPI.post("/products", postCreateProduct);

routerAPI.post("/products-many", postCreateArrayProduct);

routerAPI.put("/products", putUpdateProduct);

routerAPI.delete("/products", deleteAProduct);

routerAPI.delete("/products-many", deleteArrayProduct);

// info
routerAPI.get("/info", (req, res) => {
  return res.status(200).json({
    data: req.query,
  });
});
routerAPI.get("/info/:name/:address", (req, res) => {
  return res.status(200).json({
    data: req.params,
  });
});

module.exports = routerAPI;
