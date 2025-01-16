

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


// const express = require("express");
// const Joi = require("joi");
// const multer = require("multer");
// const path = require("path");

// module.exports = (db) => {
//   const router = express.Router();

//   // Multer setup for file uploads
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.join(__dirname, "../public/uploads"));
//     },
//     filename: (req, file, cb) => {
//       const uniqueName = `${Date.now()}-${file.originalname}`;
//       cb(null, uniqueName);
//     },
//   });

//   const upload = multer({ storage });

//   // Validation schema
//   const propertySchema = Joi.object({
//     user_id: Joi.number().required(),
//     title: Joi.string().max(150).required(),
//     description: Joi.string().optional(),
//     location: Joi.string().max(255).required(),
//     price: Joi.number().positive().required(),
//     photos: Joi.array().items(Joi.string().uri()).optional(),
//     available_from: Joi.date().required(),
//     property_type: Joi.string()
//       .valid("CONDO", "APARTMENT", "HOUSE", "STUDIO")
//       .required(),
//     bedroom_count: Joi.number().integer().min(0).required(),
//   });

//   // Fetch all properties with pagination
//   router.get("/", (req, res) => {
//     const { page = 1, limit = 10 } = req.query;
//     const offset = (page - 1) * limit;

//     db.query("SELECT * FROM properties LIMIT $1 OFFSET $2;", [limit, offset])
//       .then(({ rows }) => res.json(rows))
//       .catch((err) => {
//         console.error("Error fetching properties:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//       });
//   });


//   // Search properties
// router.get("/search", (req, res) => {
//   const { location, minPrice, maxPrice, propertyType, bedroomCount } = req.query;

//   const conditions = [];
//   const values = [];

//   if (location) {
//     conditions.push(`location ILIKE $${conditions.length + 1}`);
//     values.push(`%${location}%`);
//   }

//   if (minPrice) {
//     conditions.push(`price >= $${conditions.length + 1}`);
//     values.push(minPrice);
//   }

//   if (maxPrice) {
//     conditions.push(`price <= $${conditions.length + 1}`);
//     values.push(maxPrice);
//   }

//   if (propertyType) {
//     conditions.push(`property_type = $${conditions.length + 1}`);
//     values.push(propertyType);
//   }

//   if (bedroomCount) {
//     conditions.push(`bedroom_count = $${conditions.length + 1}`);
//     values.push(bedroomCount);
//   }

//   const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

//   db.query(`SELECT * FROM properties ${whereClause};`, values)
//     .then(({ rows }) => res.json(rows))
//     .catch((err) => {
//       console.error("Error searching properties:", err);
//       res.status(500).json({ error: "Internal Server Error" });
//     });
// });


//   // Fetch a single property by ID
//   router.get("/:id", (req, res) => {
//     const propertyId = req.params.id;

//     db.query("SELECT * FROM properties WHERE id = $1;", [propertyId])
//       .then(({ rows }) => {
//         if (rows.length === 0) {
//           return res.status(404).json({ error: "Property not found" });
//         }
//         res.json(rows[0]);
//       })
//       .catch((err) => {
//         console.error("Error fetching property:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//       });
//   });

//   // Add a new property
//   router.post("/", upload.array("photos", 5), (req, res) => {
//     const { error, value } = propertySchema.validate(req.body);

//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     const photos = req.files.map((file) => `/uploads/${file.filename}`);

//     db.query(
//       `INSERT INTO properties (user_id, title, description, location, price, photos, available_from, property_type, bedroom_count)
//        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`,
//       [
//         value.user_id,
//         value.title,
//         value.description,
//         value.location,
//         value.price,
//         JSON.stringify(photos),
//         value.available_from,
//         value.property_type,
//         value.bedroom_count,
//       ]
//     )
//       .then(({ rows }) => res.status(201).json(rows[0]))
//       .catch((err) => {
//         console.error("Error creating property:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//       });
//   });

//   // Update a property
//   router.put("/:id", (req, res) => {
//     const propertyId = req.params.id;
//     const { error, value } = propertySchema.validate(req.body);

//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     db.query(
//       `UPDATE properties
//        SET title = $1, description = $2, location = $3, price = $4, photos = $5, available_from = $6, property_type = $7, bedroom_count = $8
//        WHERE id = $9 RETURNING *;`,
//       [
//         value.title,
//         value.description,
//         value.location,
//         value.price,
//         JSON.stringify(value.photos),
//         value.available_from,
//         value.property_type,
//         value.bedroom_count,
//         propertyId,
//       ]
//     )
//       .then(({ rows }) => {
//         if (rows.length === 0) {
//           return res.status(404).json({ error: "Property not found" });
//         }
//         res.json(rows[0]);
//       })
//       .catch((err) => {
//         console.error("Error updating property:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//       });
//   });

//   // Delete a property
//   router.delete("/:id", (req, res) => {
//     const propertyId = req.params.id;

//     db.query("DELETE FROM properties WHERE id = $1 RETURNING *;", [propertyId])
//       .then(({ rows }) => {
//         if (rows.length === 0) {
//           return res.status(404).json({ error: "Property not found" });
//         }
//         res.json({ message: "Property deleted successfully" });
//       })
//       .catch((err) => {
//         console.error("Error deleting property:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//       });
//   });

//   return router;
// };
