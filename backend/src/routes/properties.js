

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

  

 //Creat new property
  router.post("/", async (req, res) => {
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
  
    const { role, id: userId } = req.user; // Extract user role and ID from the token
  
    // Ensure the user is a landlord
    if (role !== "LANDLORD") {
      return res.status(403).json({ error: "Only landlords can add properties." });
    }
  
    try {
      const result = await db.query(
        `INSERT INTO properties (user_id, title, description, location, price, photos, available_from, property_type, bedroom_count)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`,
        [
          userId,
          title,
          description,
          location,
          price,
          JSON.stringify(photos), // Convert photos array to JSON
          available_from,
          property_type,
          bedroom_count,
        ]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("Error adding property:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
//  for edite

  router.put("/:id", async (req, res) => {
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
  
    const { role, id: userId } = req.user; // Extract user role and ID from the token
  
    // Ensure the user is a landlord
    if (role !== "LANDLORD") {
      return res.status(403).json({ error: "Only landlords can edit properties." });
    }
  
    try {
      // Ensure the property belongs to the landlord
      const property = await db.query(
        "SELECT * FROM properties WHERE id = $1 AND user_id = $2",
        [propertyId, userId]
      );
  
      if (property.rows.length === 0) {
        return res.status(404).json({ error: "Property not found or not owned by you." });
      }
  
      const result = await db.query(
        `UPDATE properties
         SET title = $1, description = $2, location = $3, price = $4, photos = $5, available_from = $6, property_type = $7, bedroom_count = $8
         WHERE id = $9 RETURNING *;`,
        [
          title,
          description,
          location,
          price,
          JSON.stringify(photos),
          available_from,
          property_type,
          bedroom_count,
          propertyId,
        ]
      );
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error("Error updating property:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

  // Route to delete a property by ID
  router.delete("/:id", async (req, res) => {
    const propertyId = req.params.id;
  
    const { role, id: userId } = req.user; // Extract user role and ID from the token
  
    // Ensure the user is a landlord
    if (role !== "LANDLORD") {
      return res.status(403).json({ error: "Only landlords can delete properties." });
    }
  
    try {
      // Ensure the property belongs to the landlord
      const property = await db.query(
        "SELECT * FROM properties WHERE id = $1 AND user_id = $2",
        [propertyId, userId]
      );
  
      if (property.rows.length === 0) {
        return res.status(404).json({ error: "Property not found or not owned by you." });
      }
  
      await db.query("DELETE FROM properties WHERE id = $1", [propertyId]);
      res.json({ message: "Property deleted successfully." });
    } catch (err) {
      console.error("Error deleting property:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

  router.get("/search", async (req, res) => {
  const { location, minPrice, maxPrice, propertyType, bedroomCount } = req.query;

  // Build dynamic SQL query based on provided filters
  const conditions = [];
  const values = [];

  if (location) {
    conditions.push("location ILIKE $1");
    values.push(`%${location}%`);
  }
  if (minPrice) {
    conditions.push("price >= $2");
    values.push(minPrice);
  }
  if (maxPrice) {
    conditions.push("price <= $3");
    values.push(maxPrice);
  }
  if (propertyType) {
    conditions.push("property_type = $4");
    values.push(propertyType);
  }
  if (bedroomCount) {
    conditions.push("bedroom_count = $5");
    values.push(bedroomCount);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const query = `
    SELECT * FROM properties
    ${whereClause}
    ORDER BY price ASC;
  `;

  try {
    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Error performing search:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


  return router;
};

