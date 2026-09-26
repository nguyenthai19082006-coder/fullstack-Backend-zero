const path = require("path");

const uploadSingleFile = async (fileObject) => {
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  // let uploadPath = __dirname + fileObject.name;
  let targetPath = path.join(__dirname, "../public/images/upload");
  // build nơi chứa file trong server system : /backend_0/src/public/images/acc.png
  console.log(targetPath);
  // Use the mv() method to place the file somewhere on your server

  // acc.png => acc-timestamp.png
  // get image extension, extension là .png
  let extName = path.extname(fileObject.name); // dùng method extname lấy ra ".png" trong "acc.png"

  // get image is name (without extension)
  let baseName = path.basename(fileObject.name, extName); // Ý nghĩa: Lấy phần tên gốc của file (đã loại bỏ phần đuôi file).
  // dùng method basename để lấy tên của file và lược bỏ phần extension theo extName đã truyền vào

  // create final path: eg: /upload/your-image.png
  let finalName = `${baseName}-${Date.now()}${extName}`;
  // thiết kế đường dẫn
  let finalPath = `${targetPath}/${finalName}`; // D:\BackEnd_0\src\public\images\upload\acc-timestamp.png

  try {
    await fileObject.mv(finalPath); // sau khi kích hoạt method mv thì mới làm cho hệ thống tệp tạo file rỗng mới theo đường dẫn vừa thiết kế

    return {
      status: "success",
      path: finalName,
      error: null,
    };
  } catch (error) {
    console.log(">>> check error: ", error);

    return {
      status: "failed",
      path: null,
      error: JSON.stringify(error),
    };
  }
};

const uploadMultipleFiles = async (filesArr) => {
  try {
    let uploadPath = path.join(__dirname, "../public/images/upload");
    let resultArr = [];
    let countSuccess = 0;

    for (let i = 0; i < filesArr.length; i++) {
      // get image extension
      let extName = path.extname(filesArr[i].name); // get extension
      let baseName = path.basename(filesArr[i].name, extName); // get name and throw out extension (lấy tên và vứt bỏ .png)
      let finalName = `${baseName}-${Date.now()}${extName}`;
      let finalPath = `${uploadPath}/${finalName}`;

      try {
        await filesArr[i].mv(finalPath);

        resultArr.push({
          status: "success",
          path: finalName,
          fileName: filesArr[i].name,
          error: null,
        });

        countSuccess++;
      } catch (error) {
        console.log(">>> error: ", error);

        resultArr.push({
          status: "failed",
          path: null,
          fileName: filesArr[i].name,
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

module.exports = { uploadSingleFile, uploadMultipleFiles };

// mission:
// - đọc lại các file gồm service, controller, api => xem luồng hoạt động về việc thêm file vào server
// - save file to public/images with name file is upload
// - upload multiple files
