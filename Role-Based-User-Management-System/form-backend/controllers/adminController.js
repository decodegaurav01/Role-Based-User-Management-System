const pool = require("../config/db");
const result = require("../utils/result");


exports.getAllUsers = (req, res) => {
  const sql = `SELECT id, name, email, phone, role, image FROM users WHERE role !='ADMIN'`;

  pool.query(sql, (error, data) => {
    if (error) {
      return res.send(error);
    }


    const users = data.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      image: u.image ? `data:image/*;base64,${u.image.toString("base64")}`
        : null,
    }));

    res.send(users);
  });
};


exports.deleteUser = (req, res) => {

  const { id } = req.params;

  const sql = "DELETE FROM users WHERE id = ?";

  pool.query(sql, [id], (error, data) => {
    if (data)
      res.send(data);
    else
      res.send(error)
  });
};


exports.getUserById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM users WHERE id = ?";


  pool.query(sql, [id], (error, rows) => {
    if (error) {
      console.error("DB ERROR:", error);
      return res.send(error);
    }

    if (!rows || rows.length === 0) {
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
}

exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const { id } = req.params;

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
      if(data)
        res.send(data)
      else
        res.send(error)
    });
  } catch (err) {
    res.send(err);
  }
};

