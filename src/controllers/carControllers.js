const connection = require("../config/database");
const {
  getCarInfo,
  finishCars,
  deleteData,
} = require("../services/carService");

const Car = require("../models/car");

const getCars = async (req, res) => {
  const result = await Car.find({});
  res.render("cars/car.ejs", { cars: result });
};

const getCreate = (req, res) => {
  res.render("cars/create.ejs");
};

const createCar = async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const quantity = req.body.quantity;

  await Car.create({ name: name, price: price, quantity });
  res.redirect("/cars"); // sau khi thêm dữ liệu thì quay về trang chính
};

// UPDATE CARS
const updateCars = async (req, res) => {
  const id = req.params.id;
  let results = await Car.findById(id);
  // let car = results && results.length > 0 ? results[0] : {}; // bóc tách phần tử để qui về dạng object
  // lệnh bóc tách này sẽ áp dụng khi lấy thông tin của 1 đối tượng cụ thể
  // Cứ khi nào dùng câu lệnh SQL có điều kiện cụ thể để tra cứu 1 đối tượng duy nhất (thường là WHERE id = ? hoặc WHERE email = ?),
  // kết quả trả về từ database luôn bọc trong một mảng có 1 phần tử [ { ... } ].
  // Lúc đó bạn mới cần bóc tách [0] để biến nó thành một object đơn thuần { ... } giúp code EJS hiển thị gọn gàng, không bị lỗi.
  res.render("cars/update.ejs", { carUpdate: results });
};

const finishUpdate = async (req, res) => {
  // console.log(req.body);
  let { name, price, quantity } = req.body;
  const id = req.params.id;

  await Car.findByIdAndUpdate(id, { name, price, quantity });
  res.redirect("/cars");
};

const deleteCars = async (req, res) => {
  const id = req.params.id;
  await Car.findByIdAndDelete(id);

  res.redirect("/cars");
};

module.exports = {
  getCars,
  getCreate,
  createCar,
  updateCars,
  finishUpdate,
  deleteCars,
}; // nếu cho phép file bên ngoài sử dụng bằng {} thì bên file khác mới dùng {} để lấy dữ liệu.
