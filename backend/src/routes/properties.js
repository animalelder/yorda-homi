// const express = require("express");

// module.exports = (db) => {
//   const router = express.Router();

//   // Example route to fetch all properties
//   router.get("/", (req, res) => {
//     db.query("SELECT * FROM properties;")
//       .then(({ rows }) => res.json(rows))
//       .catch((err) => {
//         console.error("Error fetching properties:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//       });
//   });

//   return router;
// };

const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  // Route to fetch all properties
  router.get("/", (req, res) => {
    db.query("SELECT * FROM properties;")
      .then(({ rows }) => res.json(rows))
      .catch((err) => {
        console.error("Error fetching properties:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

  // Route to fetch a single property by ID
  router.get("/:id", (req, res) => {
    const propertyId = req.params.id;

    db.query("SELECT * FROM properties WHERE id = $1;", [propertyId])
      .then(({ rows }) => {
        if (rows.length === 0) {
          return res.status(404).json({ error: "Property not found" });
        }
        res.json(rows[0]);
      })
      .catch((err) => {
        console.error("Error fetching property:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

  // Route to create a new property
  router.post("/", (req, res) => {
    const {
      user_id,
      title,
      description,
      location,
      price,
      photos,
      available_from,
      property_type,
      bedroom_count,
    } = req.body;

    db.query(
      `INSERT INTO properties (user_id, title, description, location, price, photos, available_from, property_type, bedroom_count)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`,
      [
        user_id,
        title,
        description,
        location,
        price,
        JSON.stringify(photos), // Convert photos array to JSON
        available_from,
        property_type,
        bedroom_count,
      ]
    )
      .then(({ rows }) => res.status(201).json(rows[0]))
      .catch((err) => {
        console.error("Error creating property:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

  // Route to update a property by ID
  router.put("/:id", (req, res) => {
    const propertyId = req.params.id;
    const {
      title,
      description,
      location,
      price,
      photos,
      available_from,
      property_type,
      bedroom_count,
    } = req.body;

    db.query(
      `UPDATE properties
       SET title = $1, description = $2, location = $3, price = $4, photos = $5, available_from = $6, property_type = $7, bedroom_count = $8
       WHERE id = $9 RETURNING *;`,
      [
        title,
        description,
        location,
        price,
        JSON.stringify(photos), // Convert photos array to JSON
        available_from,
        property_type,
        bedroom_count,
        propertyId,
      ]
    )
      .then(({ rows }) => {
        if (rows.length === 0) {
          return res.status(404).json({ error: "Property not found" });
        }
        res.json(rows[0]);
      })
      .catch((err) => {
        console.error("Error updating property:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

  // Route to delete a property by ID
  router.delete("/:id", (req, res) => {
    const propertyId = req.params.id;

    db.query("DELETE FROM properties WHERE id = $1 RETURNING *;", [propertyId])
      .then(({ rows }) => {
        if (rows.length === 0) {
          return res.status(404).json({ error: "Property not found" });
        }
        res.json({ message: "Property deleted successfully" });
      })
      .catch((err) => {
        console.error("Error deleting property:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

  return router;
};
