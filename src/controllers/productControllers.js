const {
  createProduct,
  createSingleFileProduct,
  createMultipleFileProduct,
  getArrayProductService,
  CreateProductService,
  createArrayProductService,
  updateAProductService,
  deleteAProductService,
  deleteArrayProductService,
} = require("../services/productService");

const postCreateProductAPI = async (req, res) => {
  let { name, price, quantity, description } = req.body;

  let imageFile = req.files.image;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  if (Array.isArray(imageFile)) {
    let results = await createMultipleFileProduct(imageFile);

    return res.status(200).json({
      EC: 0,
      data: results,
    });
  } else {
    // thêm dữ liệu file vào server
    let resultFile = await createSingleFileProduct(imageFile); // thêm file và hứng dữ liệu sau khi thêm file

    // thêm dữ liệu text vào db
    let products = {
      name,
      price,
      quantity,
      image: resultFile.path,
      description,
    };
    let product = await createProduct(products); // thêm thông tin

    return res.status(200).json({
      EC: 0,
      data: product,
    });
  }
};

const getArrayProductAPI = async (req, res) => {
  let result = "";
  console.log(req.query);
  let limit = req.query.limit;
  let page = req.query.page;

  if (limit && page) {
    result = await getArrayProductService(limit, page, req.query);
  } else {
    result = await getArrayProductService();
  }

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const postCreateProduct = async (req, res) => {
  let { name, price, quantity } = req.body;
  let result = await CreateProductService({ name, price, quantity });

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const postCreateArrayProduct = async (req, res) => {
  let productArray = req.body.products;

  let results = await createArrayProductService(productArray);

  return res.status(200).json({
    EC: 0,
    data: results,
  });
};

const putUpdateProduct = async (req, res) => {
  let { id, name, price, quantity } = req.body;
  let productData = { id, name, price, quantity };

  let result = await updateAProductService(productData);

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const deleteAProduct = async (req, res) => {
  let result = await deleteAProductService(req.body.id);

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const deleteArrayProduct = async (req, res) => {
  let results = await deleteArrayProductService(req.body.idProducts);

  return res.status(200).json({
    EC: 0,
    data: results,
  });
};

module.exports = {
  postCreateProductAPI,
  getArrayProductAPI,
  postCreateProduct,
  postCreateArrayProduct,
  putUpdateProduct,
  deleteAProduct,
  deleteArrayProduct,
};

// mission:
// khi truyền 1 file thì sẽ có hàm xử lý 1 file, khi truyền nhiều file thì có hàm xử lý nhiều file
// => XONG
