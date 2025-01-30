const express = require("express");
const pool = require("../db.js");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post('/signup', async (req, res) => {
  const {email, password} = req.body;
  
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const rows = result.rows; //PostgreSQL stores results in `rows`

    if(rows.length > 0) {
      return res.status(409).json({message : "user already exists"})
    }

    const hashPassword = await bcrypt.hash(password, 10)
    await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashPassword])
    return res.status(201).json({message: "user created successfully"});

  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const rows = result.rows;

    if(rows.length === 0) {
      return res.status(404).json({message : "user does not exist"})
    }

    const isMatch = await bcrypt.compare(password, rows[0].password)
    if (!isMatch) {
      return res.status(401).json({message : "wrong password"})
    }
    const token = jwt.sign({id: rows[0].id}, process.env.JWT_KEY, {expiresIn: '3h'});

    return res.status(201).json({token: token});

  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json(err);
  }
});

module.exports = router;