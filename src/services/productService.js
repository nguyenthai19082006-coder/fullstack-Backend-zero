const Product = require("../models/product");
const path = require("path");
const aqp = require("api-query-params").default;

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

const getArrayProductService = async (limit, page, queryString) => {
  try {
    let result = "";

    if (limit && page) {
      // nếu có yếu tố phân trang thì thực thi
      let offset = (page - 1) * limit;

      // trước khi áp dụng các điều kiện để phân trang thì ta phải bóc tách từng điều kiện đó
      // ta cần dùng hàm aqp để bóc tách
      let { filter } = aqp(queryString);
      delete filter.page; // vì page thêm vô để tính cho skip nên không cần vô filter
      console.log(">>> filter: ", filter);

      result = await Product.find(filter).skip(offset).limit(limit).exec();
    } else {
      // không có thì lấy dữ liệu thôi
      let result = await Product.find();
    }

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const CreateProductService = async ({ name, price, quantity }) => {
  try {
    let result = await Product.create({ name, price, quantity });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createArrayProductService = async (productArray) => {
  try {
    let result = await Product.insertMany(productArray);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateAProductService = async (productData) => {
  try {
    let result = await Product.updateOne(
      { _id: productData.id },
      {
        name: productData.name,
        price: productData.price,
        quantity: productData.quantity,
      },
    );

    return result;
  } catch (error) {
    console.log(">>> error: ", error);
    return null;
  }
};

const deleteAProductService = async (idProduct) => {
  try {
    // xóa mềm (soft delete)
    let result = await Product.deleteById(idProduct);

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteArrayProductService = async (idArray) => {
  try {
    let result = await Product.delete({ _id: { $in: idArray } });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createProduct,
  createSingleFileProduct,
  createMultipleFileProduct,
  getArrayProductService,
  CreateProductService,
  createArrayProductService,
  updateAProductService,
  deleteAProductService,
  deleteArrayProductService,
};
