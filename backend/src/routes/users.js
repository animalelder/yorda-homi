const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (db) => {
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    try {
      // Normalize email
      const normalizedEmail = email.toLowerCase();

      // Fetch user from the database
      const result = await db.query(`SELECT * FROM USERS WHERE EMAIL = $1;`, [normalizedEmail]);

      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      const user = result.rows[0];

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "defaultSecret", // Ensure JWT_SECRET is defined
        { expiresIn: "1h" }
      );

      // Respond with token and user details
      res.status(200).json({
        success: true,
        token,
        user: {
          id: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
  
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    if (!["TENANT", "LANDLORD"].includes(role.toUpperCase())) {
      return res.status(400).json({ error: "Invalid role. Role must be 'TENANT' or 'LANDLORD'." });
    }
  
    try {
      // Normalize email and hash password
      const normalizedEmail = email.toLowerCase();
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert into the database
      const result = await db.query(
        `INSERT INTO USERS (FIRSTNAME, LASTNAME, EMAIL, PASSWORD, ROLE) 
         VALUES ($1, $2, $3, $4, $5) RETURNING ID;`,
        [firstName, lastName, normalizedEmail, hashedPassword, role.toUpperCase()]
      );
  
      res.status(201).json({
        message: "User registered successfully",
        id: result.rows[0].id,
      });
    } catch (error) {
      if (error.code === "23505") {
        return res.status(400).json({ error: "Email already in use." });
      }
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/:userId", async (req, res) => {
    console.log("Request Params:", req.params); // Log the params for debugging
    const { userId } = req.params;
  
    try {
      const result = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  

  return router;
};

