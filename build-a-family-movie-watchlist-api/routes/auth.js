
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findByUsername } from "../utils/db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password are required.",
    });
  }

  const user = findByUsername(username);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({
      error: "Invalid username or password.",
    });
  }

  const secret = process.env.JWT_SECRET;

if (!secret) {
  return res.status(500).json({ error: "JWT secret is not configured." });
}

const token = jwt.sign(
  { id: user.id, role: user.role },
  secret,
  { expiresIn: "1h" },
);

  return res.status(200).json({ token });
});

export default router;
