const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

// connect to Database
const customerSchema = new mongoose.Schema(
  {
    // design các trường dữ liệu cần có cho document in collection (database) by schema
    name: { type: String, required: true },
    // address: String,
    phone: String,
    email: String,
    image: String,
    description: String,
  },
  // setup timestamps cho document in collection by schema
  { timestamps: true }, // createdAt, updatedAt : khi bấm lưu hay sửa thì thông tin,
  // thời gian của những trường này sẽ tự động cập nhật và hiển thị.
);

// thêm thư viện plugin vào schema để thiết lập cho hình thức mà schema xây dựng,
// nó sẽ sinh ra thêm trường dữ liệu (key) trong schema và đánh dấu true false khi xóa.
customerSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Customer = mongoose.model("customer", customerSchema); // áp dụng phần schema vào collection trong database

module.exports = Customer;

// schema: định dạng hình thức cho document trong database.
