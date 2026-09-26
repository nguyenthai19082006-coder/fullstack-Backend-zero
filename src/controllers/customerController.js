const { uploadSingleFile } = require("../services/fileService");
const { createCustomerService } = require("../services/customerService");

module.exports = {
  // { key : value }, viết dưới dạng object thì không cần khai báo let, var, const và phải viết dưới dạng key value
  postCreateCustomerAPI: async (req, res) => {

    // 4 CÔNG ĐOẠN LÀM VIỆC TRONG CONTROLLER 

    // Công đoạn 1: cách lấy ra data
    let { name, address, phone, email, description } = req.body;
    let imageUrl = "";

    // Công đoạn 2: cách upload file
    if (!req.files || Object.keys(req.files).length === 0) {
      // do nothing : không làm gì
    } else {
      let result = await uploadSingleFile(req.files.image);
      imageUrl = result.path;
      console.log(">>> check result: ", result.path);
    }

    // Công đoạn 3: gọi service để xử lý dữ liệu
    let customerData = {
      name,
      address,
      phone,
      email,
      description,
      image: imageUrl,
    };
    let customer = await createCustomerService(customerData);

    // Công đoạn 4: gửi phản hồi cho phía client
    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  },
};
