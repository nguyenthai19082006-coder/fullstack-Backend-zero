const connection = require("../config/database");

const getProduct = async () => {
  let [results, fields] = await connection.query("SELECT * from Products");
  return results;
};

const createProduct = async (name, price, quantity) => {
  await connection.query(
    "INSERT INTO Products (name, price, quantity) Values (?, ?, ?)",
    [name, price, quantity],
  );
};

const getUpdatePrd = async (id) => {
  let [results, fields] = await connection.query(
    "SELECT * from Products WHERE id = ?",
    [id],
  );
  return results;
};

const finishUpdatePrd = async (name, price, quantity, id) => {
  await connection.query(
    "UPDATE Products SET name = ?, price = ?, quantity = ? WHERE id = ?",
    [name, price, quantity, id],
  );
};

const finishDeleted = async (id) => {
    await connection.query("DELETE from Products WHERE id = ?", [id])
}

module.exports = { getProduct, createProduct, getUpdatePrd, finishUpdatePrd, finishDeleted };
