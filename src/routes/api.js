const express = require("express");
const {
  getUsersAPI,
  createUsersAPI,
  putUsersAPI,
  deleteUsersAPI,
  postUploadSingleFileApi,
  postUploadMultipleFileApi,
} = require("../controllers/apiController");

const { postCreateCustomerAPI } = require("../controllers/customerController");

const { postCreateProductAPI } = require("../controllers/productControllers");

const routerAPI = express.Router();

routerAPI.get("/users", getUsersAPI);

routerAPI.post("/users", createUsersAPI);

routerAPI.put("/users", putUsersAPI);

routerAPI.delete("/users", deleteUsersAPI);

routerAPI.post("/file", postUploadSingleFileApi);

routerAPI.post("/files", postUploadMultipleFileApi);

routerAPI.post("/customers", postCreateCustomerAPI);

routerAPI.post("/products", postCreateProductAPI);

module.exports = routerAPI;
