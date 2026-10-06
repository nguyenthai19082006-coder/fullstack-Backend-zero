const Customer = require("../models/customers");
const aqp = require("api-query-params").default;

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

const getArrayCustomerService = async (limit, page, email, queryString) => {
  try {
    let result = "";
    if (limit && page) {
      let offset = (page - 1) * limit;

      const { filter } = aqp(queryString);
      delete filter.page; // xóa thuộc tính page trong filter
      console.log(">>> check filter: ", filter);

      result = await Customer.find(filter).skip(offset).limit(limit).exec();
      // collection hãy lấy giúp t dữ liệu trong db với điều kiện là bỏ qua số lượng offset tính từ vị trí đầu và lấy số lượng limit kế đó
      // exec() giúp lệnh chuẩn xác hơn
    } else {
      result = await Customer.find({});
    }

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

const deleteArrayCustomerService = async (customerIdArray) => {
  try {
    let result = await Customer.delete({ _id: { $in: customerIdArray } }); // xóa những dữ liệu có key _id,
    // $in: nói với collection rằng những thằng cần xử lý ở đây

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

module.exports = {
  createCustomerService,
  createArrayCustomerService,
  getArrayCustomerService,
  updateCustomerService,
  deleteACustomerService,
  deleteArrayCustomerService,
};
