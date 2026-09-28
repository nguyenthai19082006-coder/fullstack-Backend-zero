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
} = require("../controllers/customerController");

const { postCreateProductAPI } = require("../controllers/productControllers");

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
routerAPI.post("/customers", postCreateCustomerAPI);

routerAPI.post("/customers-many", postCreateArrayCustomer);

// Product
routerAPI.post("/products", postCreateProductAPI);

module.exports = routerAPI;
