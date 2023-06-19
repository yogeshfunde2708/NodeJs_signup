const mysql2 = require("mysql2");
const dotenv = require("dotenv");

let instance = null;
dotenv.config();

const connection = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});
connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  // console.log('db' + connection.state)
});

class dbService {
  static getDbServiceInstance() {
    return instance ? instance : new dbService();
  }
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names;";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertNewDetail(email, name, gender, password, confirmpassword) {
    try {
      const dateAdded = new Date();
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO names (email, name, gender, password, confirmpassword, date_added) VALUES (?, ?, ?, ?, ?,?);";

        connection.query(
          query,
          [email, name, gender, password, confirmpassword, dateAdded],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.insertId);
          }
        );
      });
      return {
        id: insertId,
        email: email,
        name: name,
        gender: gender,
        password: password,
        confirmpassword: confirmpassword,
        dateAdded: dateAdded,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteRowById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM names WHERE id = ?";
        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateNameById(id, email, name, gender, password, confirmpassword) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE names SET name = ?, email = ?,  gender = ?, password = ?, confirmpassword = ? WHERE id = ? ";
        connection.query(
          query,
          [name, email, gender, password, confirmpassword, id],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.affectedRows);
          }
        );
      });
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async searchByName(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names  WHERE name = ?;";

        connection.query(query, [name], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = dbService;
