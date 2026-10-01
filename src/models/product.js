const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

// connect to Database
const productSchema = new mongoose.Schema(
  {
    // design các trường dữ liệu cần có cho document in collection (database) by schema
    name: { type: String, require: true },
    // address: String,
    price: Number,
    quantity: Number,
    image: String,
    description: String,
  },
  // setup timestamps cho document in collection by schema
  { timestamps: true }, // createdAt, updatedAt : khi bấm lưu hay sửa thì thông tin,
  // thời gian của những trường này sẽ tự động cập nhật và hiển thị.
);

productSchema.plugin(mongoose_delete);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
