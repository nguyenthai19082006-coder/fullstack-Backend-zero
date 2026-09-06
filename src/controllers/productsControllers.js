const connection = require("../config/database");
const {
  getProduct,
  createProduct,
  getUpdatePrd,
  finishUpdatePrd,
  finishDeleted,
} = require("../services/productService");

// tạo biến lưu giá trị của hàm xử lý dữ liệu với project mini về MVC
const getProducts = async (req, res) => {
  let results = await getProduct();
  res.render("products/products.ejs", { products: results });
};

const getCreatePrd = (req, res) => {
  res.render("products/create-prd.ejs");
};

const CreatePrd = async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const quantity = req.body.quantity;

  await createProduct(name, price, quantity);
  res.redirect("/products");
};

// click update and render page update
const updatePrd = async (req, res) => {
  const id = req.params.id;
  let results = await getUpdatePrd(id);
  let product = results && results.length > 0 ? results[0] : {};

  res.render("products/updatePrd.ejs", { product: product });
};

const successfulUpdate = async (req, res) => {
  let { name, price, quantity } = req.body;
  const id = req.params.id;
  await finishUpdatePrd(name, price, quantity, id);
  res.redirect("/products");
};

const succeedDeleted = async (req, res) => {
  const id = req.params.id;
  await finishDeleted(id);

  res.redirect("/products");
};

module.exports = {
  getProducts,
  getCreatePrd,
  CreatePrd,
  updatePrd,
  successfulUpdate,
  succeedDeleted,
};

// yeah, successfully CRUD !!!