const router = require("express").Router();

module.exports = (db) => {
  // Route to get all users
  router.get("/", (request, response) => {
    db.query(`SELECT id, first_name, last_name, email, role FROM USERS;`)
      .then(({ rows: users }) => {
        response.json(users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        response.status(500).json({ error: "Internal Server Error" });
      });
  });

  // Get user by ID
  router.get("/:id", (request, response) => {
    const userId = request.params.id;

    db.query(`SELECT id, first_name, last_name, email, role FROM USERS WHERE id = $1;`, [userId])
      .then(({ rows: user }) => {
        if (user.length === 0) {
          response.status(404).json({ error: "User not found" });
        } else {
          response.json(user[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        response.status(500).json({ error: "Internal Server Error" });
      });
  });

  // User login
  // router.post("/login", (req, res) => {
  //   const { email, password } = req.body;

  //   db.query(`SELECT * FROM USERS WHERE email = $1`, [email])
  //     .then((data) => {
  //       const user = data.rows[0];
  //       if (!user) {
  //         return res.status(401).json({ error: "Invalid email or password" });
  //       }

  //       if (password === user.password_hash) {
  //         res.json({
  //           id: user.id,
  //           first_name: user.first_name,
  //           last_name: user.last_name,
  //           email: user.email,
  //           role: user.role,
  //         });
  //       } else {
  //         res.status(401).json({ error: "Invalid email or password" });
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error querying database:", error);
  //       res.status(500).json({ error: "Internal Server Error" });
  //     });
  // });


  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const userResult = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
  
      if (userResult.rows.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      const user = userResult.rows[0];
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      // Generate token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({
        success: true,
        token,
        user: { id: user.id, username: user.username, role: user.role },
      });
    } catch (err) {
      console.error("Error logging in:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body; // Match camelCase keys
  
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    try {
      const result = await db.query(
        `INSERT INTO USERS (FIRSTNAME, LASTNAME, EMAIL, PASSWORD, ROLE) VALUES ($1, $2, $3, $4, $5) RETURNING ID`,
        [firstName, lastName, email, password, role.toUpperCase()] // Convert role to uppercase if needed
      );
 
      res.status(201).json({
        message: "User registered successfully",
        id: result.rows[0].id,
      });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  


  // router.post("/register", async (req, res) => {
  //   const { username, email, password } = req.body;
  
  //   try {
  //     // Register the user
  //     const userResult = await db.query(
  //       `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;`,
  //       [username, email, password]
  //     );
  //     const userId = userResult.rows[0].id;
  
  //     // Create a profile for the new user
  //     await db.query(
  //       `INSERT INTO profiles (user_id) VALUES ($1);`,
  //       [userId]
  //     );
  
  //     res.status(201).json({ message: "User registered successfully" });
  //   } catch (err) {
  //     console.error("Error registering user:", err);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });
  
  
  
  //     res.status(201).json({
  //       message: "User registered successfully",
  //       id: result.rows[0].id,
  //     });
  //   } catch (error) {
  //     console.error("Error during user registration:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });
  return router;
  
};
