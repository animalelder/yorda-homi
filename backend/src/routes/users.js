const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (db) => {

router.get("/", async (req, res) => {
    //console.log("GET /api/users endpoint hit"); // Log when the route is hit
  
    try {
      const result = await db.query("SELECT * FROM users;");
      //console.log("Users fetched successfully:", result.rows); // Log the result from the database
      res.json(result.rows); // Respond with the user data
    } catch (error) {
      console.error("Error fetching users:", error); // Log the error
      res.status(500).json({ error: "Internal Server Error", details: error.message }); // Respond with error
    }
  });
  
  
  
  // Login Route
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    try {
      const normalizedEmail = email.toLowerCase();

      // Fetch user from the database
      const userResult = await db.query(`SELECT * FROM users WHERE email = $1;`, [normalizedEmail]);

      if (userResult.rows.length === 0) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      const user = userResult.rows[0];

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "defaultSecret",
        { expiresIn: "1h" }
      );

      // Fetch additional profile data based on role
      let profileData = null;
      if (user.role === "tenant") {
        const tenantResult = await db.query(
          `SELECT * FROM tenant_profiles WHERE user_id = $1;`,
          [user.id]
        );
        profileData = tenantResult.rows[0];
      } else if (user.role === "landlord") {
        const landlordResult = await db.query(
          `SELECT * FROM landlord_profiles WHERE user_id = $1;`,
          [user.id]
        );
        profileData = landlordResult.rows[0];
      }

      // Respond with token, user details, and profile
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
        profile: profileData,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Register Route
  router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const normalizedRole = role.toLowerCase();
    if (!["tenant", "landlord"].includes(normalizedRole)) {
      return res.status(400).json({ error: "Invalid role. Role must be 'tenant' or 'landlord'." });
    }

    try {
      // Normalize email and hash password
      const normalizedEmail = email.toLowerCase();
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert into the `users` table
      const userResult = await db.query(
        `INSERT INTO users (firstname, lastname, email, password, role) 
         VALUES ($1, $2, $3, $4, $5) RETURNING id, role;`,
        [firstName, lastName, normalizedEmail, hashedPassword, normalizedRole]
      );

      const userId = userResult.rows[0].id;

      // Insert into the appropriate profile table based on role
      if (normalizedRole === "tenant") {
        await db.query(
          `INSERT INTO tenant_profiles (user_id, firstname, lastname, pet_friendly, verification_status) 
           VALUES ($1, $2, $3, $4, $5);`,
          [userId, firstName, lastName, false, false] // Defaults for `pet_friendly` and `verification_status`
        );
      } else if (normalizedRole === "landlord") {
        await db.query(
          `INSERT INTO landlord_profiles (user_id, firstname, lastname, pet_friendly, verification_status) 
           VALUES ($1, $2, $3, $4, $5);`,
          [userId, firstName, lastName, false, false] // Defaults for `pet_friendly` and `verification_status`
        );
      }

      res.status(201).json({
        message: "User registered successfully",
        userId,
        role: normalizedRole,
      });
    } catch (error) {
      if (error.code === "23505") {
        return res.status(400).json({ error: "Email already in use." });
      }
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router; // Return the router object
};
