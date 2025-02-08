const express = require("express");
const pool = require("../db.js"); // Database connection
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SIGNUP --- ROUTE //
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const rows = result.rows;

    if (rows.length > 0) {
      return res.status(409).json({ message: "user already exists" });
    }

    // Hash the password before storing it in the database
    const hashPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      email,
      hashPassword,
    ]);

    // Automatically login user after successful signup
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1 limit 1;",
      [email],
    );

    // Generate a JWT token for authentication
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_KEY, {
      expiresIn: "3h",
    });

    return res
      .status(201)
      .json({ message: "user created successfully", token });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json(err);
  };
});


// LOGIN --- ROUTE //
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const rows = result.rows;

    if (rows.length === 0) {
      return res.status(404).json({ message: "user does not exist" });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "wrong password" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_KEY, {
      expiresIn: "3h",
    });

    return res.status(201).json({ token: token });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json(err);
  };
});


// TOKEN VERIFICATION MIDDLEWARE //
const verifyToken = async (req, res, next) => {
  try {
    // Extract token from authorization header
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.id;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  };
};

// PROTECTED ROUTE TO FETCH USER NOTES //
router.get("/notes", verifyToken, async (req, res) => {
  try {
    // Fetch user from database using the verified user ID
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.userId,
    ]);
    const rows = result.rows;

    if (rows.length === 0) {
      return res.status(404).json({ message: "user does not exist" });
    }

    return res.status(201).json({ user: rows[0] });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  };
});

module.exports = router;
