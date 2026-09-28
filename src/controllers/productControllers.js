const {
  createProduct,
  createSingleFileProduct,
  createMultipleFileProduct,
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

module.exports = { postCreateProductAPI };

// mission:
// khi truyền 1 file thì sẽ có hàm xử lý 1 file, khi truyền nhiều file thì có hàm xử lý nhiều file
// => XONG
