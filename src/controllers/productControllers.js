const {
  createProduct,
  createFileProduct,
} = require("../services/productService");

const postCreateProductAPI = async (req, res) => {
  let { name, price, quantity, description } = req.body;

  let imageFile = req.files.image;

  // thêm dữ liệu file vào server
  let resultFile = await createFileProduct(imageFile); // thêm file và hứng dữ liệu sau khi thêm file

  // thêm dữ liệu text vào db
  let products = { name, price, quantity, image: resultFile.path, description };
  let product = await createProduct(products); // thêm thông tin 

  return res.status(200).json({
    EC: 0,
    data: product,
  });
};

module.exports = { postCreateProductAPI };
