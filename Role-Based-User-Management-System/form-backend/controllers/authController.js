const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const result = require("../utils/result");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;



    const hashedPassword = await bcrypt.hash(password, 10);
    const image = req.file.buffer;

    const sql =
      "INSERT INTO users(name,email,phone,password,image,role) VALUES(?,?,?,?,?,?)";

    pool.query(sql, [name, email, phone, hashedPassword, image, role], (error, data) => {
      if (data)
        res.send(data);
      else
        res.send(error)
    }
    );
  } catch (err) {
    res.send(err);
  }
};

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  const decodedEmail = Buffer.from(email, 'base64').toString('utf8');
  const decodedPassword = Buffer.from(password, 'base64').toString('utf8');

  const sql = "SELECT * FROM users WHERE email = ?";

  pool.query(sql, [decodedEmail], async (error, data) => {
    if (error) {
      return res.send(error);
    }

    if (!data || data.length === 0) {
      return res.send(error);
    }

    const user = data[0];
    const isMatch = await bcrypt.compare(decodedPassword, user.password);

    if (!isMatch) {
      return res.send(error);
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const body = {
      token,
      name: user.name,
      role: user.role,
      email: user.email,
    };

    res.send(body);
  });
};

