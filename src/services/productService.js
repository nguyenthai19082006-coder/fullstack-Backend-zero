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

const createSingleFileProduct = async (imageFile) => {
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

const createMultipleFileProduct = async (imageArray) => {
  try {
    let uploadFile = path.join(__dirname, "../public/images/img");
    let resultArr = [];
    let countSuccess = 0;

    for (let i = 0; i < imageArray.length; i++) {
      // tạo tên
      let extName = path.extname(imageArray[i].name);
      let baseName = path.basename(imageArray[i].name, extName);

      // nối tên
      let finalName = `${baseName}-${Date.now()}${extName}`;
      // gắn tên vừa nối vào đường dẫn để chốt
      let finalPath = `${uploadFile}/${finalName}`;

      // sau khi tạo xong đường dẫn chuẩn (nơi chứa file) thì giờ sẽ di chuyển dữ liệu file đã hứng bên controller vào nơi chứa
      try {
        await imageArray[i].mv(finalPath);

        resultArr.push({
          status: "success",
          path: finalName,
          fileName: imageArray[i].name,
          error: null,
        });

        countSuccess++;
      } catch (error) {
        console.log(error);

        resultArr.push({
          status: "failed",
          path: null,
          fileName: imageArray[i].name,
          error: JSON.stringify(error),
        });
      }
    }

    return {
      countSuccess: countSuccess,
      detail: resultArr,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct,
  createSingleFileProduct,
  createMultipleFileProduct,
};
