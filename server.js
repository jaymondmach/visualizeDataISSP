const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files (index.html) from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Users for authentication
const users = [{ username: "setu", password: "setupw" }];

// Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password", // Replace with your MySQL password
  database: "issp",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL server");
  }
});

// Login route for authentication
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ success: true, message: "Authenticated" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Data route to fetch data from MySQL
app.post("/data", (req, res) => {
  // Simulate a login check based on credentials sent
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    db.query("SELECT * FROM nbaplayers", (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  } else {
    res.status(401).json({ success: false, message: "Unauthenticated" });
  }
});

// Start the server
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
