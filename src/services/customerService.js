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

const createArrayCustomerService = async (arr) => {
  try {
    let result = await Customer.insertMany(arr);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getArrayCustomerService = async () => {
  try {
    let result = await Customer.find();

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const updateCustomerService = async (customerData) => {
  try {
    let result = await Customer.updateOne(
      { _id: customerData.id },
      { name: customerData.name, email: customerData.email },
    );

    return result;
  } catch (error) {
    console.log(">>> error: ", error);

    return null;
  }
};

const deleteACustomerService = async (id) => {
  try {
    let result = await Customer.deleteById(id);

    return result;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

module.exports = {
  createCustomerService,
  createArrayCustomerService,
  getArrayCustomerService,
  updateCustomerService,
  deleteACustomerService,
};
