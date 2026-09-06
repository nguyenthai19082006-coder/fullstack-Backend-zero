const connection = require("../config/database");

const getCarInfo = async (id) => {
  let [results, fields] = await connection.query(
    `SELECT * from Cars WHERE id = ?`,
    [id],
  );
  return results;
};

const finishCars = async (name, price, id) => {
  await connection.query(`UPDATE Cars SET name = ?, price = ? WHERE id = ? `, [name, price, id])
};

const deleteData = async (id) => {
  await connection.query("DELETE from Cars WHERE id = ?", [id]);
};

module.exports = { getCarInfo, finishCars, deleteData };
