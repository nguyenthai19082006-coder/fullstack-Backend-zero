const connection = require("../config/database");
const {
  getAllUsers,
  finishUpdate,
  finishDelete,
} = require("../services/CRUDService");

const getHomepage = async (req, res) => {
  let results = await getAllUsers();
  return res.render("home.ejs", { listUsers: results });
};

const getABC = (req, res) => {
  res.send("check ABC");
};

const getHoiDanIT = (req, res) => {
  res.render("sample.ejs");
};

const getCreateUser = (req, res) => {
  res.render("create.ejs");
};

const getUpdateUser = async (req, res) => {
  const userID = req.params.id;
  let [results, fields] = await connection.query(
    `Select * from Users where id = ?`,
    [userID],
  );
  console.log(results);

  let user = results && results.length > 0 ? results[0] : {};

  res.render("edit.ejs", { userEdit: user });
};

// LƯU THÔNG TIN SAU KHI UPDATE
const succeedUpdate = async (req, res) => {
  let email = req.body.myEmail;
  let name = req.body.myName;
  let city = req.body.myCity;
  const id = req.params.id; // lấy url động để xác nhận id
  await finishUpdate(email, name, city, id);

  res.redirect("/");
};

const postCreateUser = async (req, res) => {
  console.log(">> req.body: ", req.body); // req.body : lấy dữ liệu từ phía client
  // (nhập giá trị tại client sau đó gửi vào action trong form, server sẽ nhận và req.body sẽ lấy dữ liệu mà client vừa gửi vào,
  // sau khi có dữ liệu thì cần key để chứa dữ liệu đó, và đó chính là name="" trong input(nơi nhập các dữ liệu tại client)).

  let email = req.body.myEmail;
  let name = req.body.myName;
  let city = req.body.myCity;

  // let {email, name, city} = req.body;
  console.log(">> email =", email, ", name =", name, ", city =", city);

  let [results, fields] = await connection.query(
    `INSERT INTO Users (email, name, city) VALUES (?, ?, ?) `,
    [email, name, city],
  );

  console.log(">>> check result: ", results);

  res.send("Created user succeed !");

  // connection.query("SELECT * from Users u ", function (err, results, fields) {
  //   console.log(">>> results = ", results); // results contains rows returned by server
  // }
  // )
  // const [result, fields] = await connection.query("SELECT * from Users u ");
};
// delete users information
const deleteUser = async (req, res) => {
  const id = req.params.id; // get id to service
  await finishDelete(id); // callback

  res.redirect("/"); // back to homepage
};

module.exports = {
  getHomepage,
  getABC,
  getHoiDanIT,
  getCreateUser,
  postCreateUser,
  getUpdateUser,
  succeedUpdate,
  deleteUser,
};

// req.body : dùng lưu trữ dữ liệu khi gửi yêu cầu
// req.params : dùng lưu trữ dữ liệu của url động
