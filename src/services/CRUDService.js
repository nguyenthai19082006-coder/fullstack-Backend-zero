// file xử lý dữ liệu của homeController

const connection = require("../config/database");

const getAllUsers = async () => {
  let [results, fields] = await connection.query("SELECT * from Users u ");
  return results;
};

const finishUpdate = async (email, name, city, id) => {
  let [results, fields] = await connection.query(
    "UPDATE Users SET email = ?, name = ?, city = ? WHERE id = ?",
    [email, name, city, id],
  );

  return results;
};

const finishDelete = async (id) => {
  let [results, fields] = await connection.query(
    "DELETE from Users WHERE id = ?",
    [id],
  );
};

module.exports = { getAllUsers, finishUpdate, finishDelete };
