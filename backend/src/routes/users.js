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
  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(`SELECT * FROM USERS WHERE email = $1`, [email])
      .then((data) => {
        const user = data.rows[0];
        if (!user) {
          return res.status(401).json({ error: "Invalid email or password" });
        }

        if (password === user.password_hash) {
          res.json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
          });
        } else {
          res.status(401).json({ error: "Invalid email or password" });
        }
      })
      .catch((error) => {
        console.error("Error querying database:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
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
