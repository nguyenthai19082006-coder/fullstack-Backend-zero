const { uploadSingleFile } = require("../services/fileService");
const {
  createCustomerService,
  createArrayCustomerService,
  getArrayCustomerService,
  updateCustomerService,
  deleteACustomerService,
  deleteArrayCustomerService,
} = require("../services/customerService");

const Joi = require("joi");

module.exports = {
  // { key : value }, viết dưới dạng object thì không cần khai báo let, var, const và phải viết dưới dạng key value
  getArrayCustomer: async (req, res) => {
    console.log(req.query);
    let limit = req.query.limit;
    let page = req.query.page;
    let email = req.query.email;

    let result = "";

    if (limit && page) {
      // nếu có limit và page thì gọi service và truyền cho service
      result = await getArrayCustomerService(limit, page, email, req.query);
    } else {
      // ngược lại nếu không có thì cứ gọi service và không truyền
      result = await getArrayCustomerService();
    }

    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },

  postCreateCustomerAPI: async (req, res) => {
    // 4 CÔNG ĐOẠN LÀM VIỆC TRONG CONTROLLER
    // Công đoạn 1: cách lấy ra data
    let { name, address, phone, email, description } = req.body;

    // dùng thư viện Joi xây dựng khuôn mẫu xác thực
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      address: Joi.string(),
      phone: Joi.string().pattern(new RegExp("^[0-9]{8,11}$")),
      email: Joi.string().email(),
      description: Joi.string(),
    });

    // sau đấy dùng thư viện Joi để xác thực dữ liệu theo khuôn mẫu vừa xây dựng
    const { error } = schema.validate(req.body); // chỉ cần 1 biến error để hứng vì chỉ cần xác thực xem dữ liệu có lỗi hay không
    // nếu có lỗi thì dừng lại và báo lỗi cho client còn nếu không lỗi thì tiếp tục gọi service để xử lý dữ liệu
    if (error) {
      return error;
    } else {
      let imageUrl = "";

      // Công đoạn 2: cách upload file
      if (!req.files || Object.keys(req.files).length === 0) {
        // do nothing : không làm gì
      } else {
        let result = await uploadSingleFile(req.files.image);
        imageUrl = result.path;
        // console.log(">>> check result: ", result.path);
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
    }
  },

  postCreateArrayCustomer: async (req, res) => {
    console.log(">>> check data: ", req.body.customers);
    let result = await createArrayCustomerService(req.body.customers);

    if (result) {
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } else {
      return res.status(400).json({
        EC: -1,
        data: result,
      });
    }
  },

  putUpdateCustomerAPI: async (req, res) => {
    let { id, name, email } = req.body;
    let customerData = { id, name, email };

    let result = await updateCustomerService(customerData);

    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },

  deleteCustomerAPI: async (req, res) => {
    let id = req.body.id;

    let result = await deleteACustomerService(id);

    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },

  deleteArrayCustomer: async (req, res) => {
    let customerIdArray = req.body.customersId;
    let results = await deleteArrayCustomerService(customerIdArray);

    return res.status(200).json({
      EC: 0,
      data: results,
    });
  },
};

// task:
// đọc lại luồng chạy khi deploy schema để build validate data, và kích hoạt thư viện Joi validate data with schema model
// khi cần gọi Joi để xác thực thì gọi hàm validate() để truy tới schema
