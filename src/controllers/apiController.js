const { User } = require("../models/user");
const {
  uploadSingleFile,
  uploadMultipleFiles,
} = require("../services/fileService");

const getUsersAPI = async (req, res) => {
  let results = await User.find({});

  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

const createUsersAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  let results = await User.create({
    name: name,
    email: email,
    city: city,
  });

  return res.status(200).json({
    // json({}) : lời nhắn(message) for server to client.
    errorCode: 0,
    data: results,
  });
};

const putUsersAPI = async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const city = req.body.city;

  let user = await User.updateOne({ _id: id }, { name: name, email, city });

  return res.status(200).json({
    EC: 0,
    data: user,
  });
};

const deleteUsersAPI = async (req, res) => {
  let id = req.body.id;

  let user = await User.deleteOne({ _id: id });

  return res.status(200).json({
    EC: 0,
    data: user,
  });
};

// hàm xử lý dữ liệu cho 1 object nên khi truyền nhiều file vào thì hàm không thể xử lý => bug
// gửi file single tức là gửi 1 file dưới dạng object
// gửi file dạng multiple thì đã trở thành 1 array
// nên hàm singleFile không thể xử lý vì thao tác ở hàm này chỉ dùng cho 1 object
const postUploadSingleFileApi = async (req, res) => {
  console.log(req.files.image);
  let results = await uploadSingleFile(req.files.image);
  console.log(">>> check results: ", results);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  return res.send("ok single");
};

// hàm multipleFile sinh ra để xử lý array, nên có thể gửi cùng lúc nhiều file vào API vì hàm này có thể xử lý
// hàm dành cho dạng array
const postUploadMultipleFileApi = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  // console.log(req.files.image);

  // upload single file => file is an object.
  // upload multiple file => files is an array.

  if (Array.isArray(req.files.image)) {
    // upload multiple
    let result = await uploadMultipleFiles(req.files.image);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  } else {
    // upload single
    return await postUploadSingleFileApi(req, res); // nếu là truyền 1 file thì gọi hàm xử lý 1 file 
                                                    // và gửi cho hàm đó dữ liệu file đã nhận từ phía client
  }
};

module.exports = {
  getUsersAPI,
  createUsersAPI,
  putUsersAPI,
  deleteUsersAPI,
  postUploadSingleFileApi,
  postUploadMultipleFileApi,
};

// số ít thì hàm số ít xử lý
// số nhiều thì cần xử lý cả số ít cả số nhiều nên sẽ cần xây dựng cả 2 hàm để xử lý
