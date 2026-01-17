const pool = require("../config/db");
const result = require("../utils/result");


// User By Id
exports.getLoginUser = (req, res) => {
  try {
    const userId = req.userId;

    const sql =
      "SELECT id, name, email, phone, role, image FROM users WHERE id = ?";

    pool.query(sql, [userId], (error, rows) => {
      if (error) {
        return res.send(error);
      }

      if (rows.length === 0) {
        return res.send(error);
      }

      const user = rows[0];

      const response = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        image: user.image
          ? `data:image/jpeg;base64,${user.image.toString("base64")}`
          : null,
      };

      res.send(response);
    });
  } catch (err) {
    res.send(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, role } = req.body;
    const id = req.userId;

   

    let sql;
    let values;

    if (req.file) {
      const image = req.file.buffer;
      sql = `
        UPDATE users
        SET name = ?, email = ?, phone = ?, image = ?
        WHERE id = ?
      `;

      values = [name, email, phone, image, id];
    } else {
      sql = `
        UPDATE users
        SET name = ?, email = ?, phone = ?
        WHERE id = ?
      `;

      values = [name, email, phone, id];
    }

    pool.query(sql, values, (error, data) => {
      res.send(data);
    });
  } catch (err) {
    res.send(err);
  }
};