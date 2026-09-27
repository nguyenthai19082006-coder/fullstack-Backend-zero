const Product = require("../models/product");
const path = require("path");

const createProduct = async (products) => {
  try {
    let result = await Product.create(products);

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const createFileProduct = async (imageFile) => {
  const uploadFile = path.join(__dirname, "../public/images/upload");

  // file cần có tên và timestamp
  const extName = path.extname(imageFile.name); // lấy extension
  const baseName = path.basename(imageFile.name, extName); // lấy tên nhưng trừ extension (ví dụ: app.png thì chỉ lấy app)

  // nối
  const finalName = `${baseName}-${Date.now()}${extName}`;
  const finalPath = `${uploadFile}/${finalName}`;

  try {
    await imageFile.mv(finalPath);

    return {
      status: "success",
      path: finalName,
      error: null,
    };
  } catch (error) {
    console.log(">>> error: ", error);

    return {
      status: "failed",
      path: null,
      error: JSON.stringify(error),
    };
  }
};

module.exports = { createProduct, createFileProduct };
