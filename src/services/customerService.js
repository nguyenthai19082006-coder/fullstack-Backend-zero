const Customer = require("../models/customers");

const createCustomerService = async (customerData) => {
  // khi nào dùng try and catch ? => khi mà cảm giác hàm sẽ có lỗi xảy ra thì dùng try and catch để check lỗi
  // try sẽ xử lý thành công, nếu lỗi thì qua catch xem lỗi
  try {
    let result = await Customer.create(customerData);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { createCustomerService };
