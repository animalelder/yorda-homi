// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const router = express.Router();

// // Multer setup for profile photo uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../public/uploads")); // Upload directory
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });
// const upload = multer({ storage });

// // Fetch the tenant's profile
// router.get("/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const result = await db.query(
//       `SELECT * FROM profiles WHERE user_id = $1;`,
//       [userId]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Profile not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error("Error fetching profile:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Edit a tenant's profile
// router.put("/:userId", upload.single("photo"), async (req, res) => {
//   const { userId } = req.params;
//   const { bio } = req.body;
//   const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

//   try {
//     const result = await db.query(
//       `UPDATE profiles
//        SET bio = COALESCE($1, bio),
//            photo = COALESCE($2, photo),
//            updated_at = CURRENT_TIMESTAMP
//        WHERE user_id = $3
//        RETURNING *;`,
//       [bio, photoPath, userId]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Profile not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error("Error updating profile:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;



const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Multer setup for profile photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads")); // Upload directory
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Fetch a user's profile
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await db.query(`SELECT * FROM profiles WHERE user_id = $1;`, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new profile
router.post("/", upload.single("photo"), async (req, res) => {
  const { userId, firstName, lastName, phoneNumber, occupation } = req.body;
  const profilePictureUrl = req.file ? `/uploads/${req.file.filename}` : null;

  // Validate required fields
  if (!userId || !occupation || !['STUDENT', 'EMPLOYED'].includes(occupation.toUpperCase())) {
    return res.status(400).json({ error: "Invalid or missing required fields" });
  }

  try {
    const result = await db.query(
      `INSERT INTO profiles (user_id, firstname, lastname, phone_number, occupation, profile_picture_url, verification_status)
       VALUES ($1, $2, $3, $4, $5, $6, DEFAULT)
       RETURNING *;`,
      [userId, firstName, lastName, phoneNumber, occupation.toUpperCase(), profilePictureUrl]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating profile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Edit an existing profile
router.put("/:userId", upload.single("photo"), async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, phoneNumber, occupation } = req.body;
  const profilePictureUrl = req.file ? `/uploads/${req.file.filename}` : null;

  // Validate occupation
  if (occupation && !['STUDENT', 'EMPLOYED'].includes(occupation.toUpperCase())) {
    return res.status(400).json({ error: "Invalid occupation value" });
  }

  try {
    const result = await db.query(
      `UPDATE profiles
       SET firstname = COALESCE($1, firstname),
           lastname = COALESCE($2, lastname),
           phone_number = COALESCE($3, phone_number),
           occupation = COALESCE($4, occupation),
           profile_picture_url = COALESCE($5, profile_picture_url),
           updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $6
       RETURNING *;`,
      [firstName, lastName, phoneNumber, occupation ? occupation.toUpperCase() : null, profilePictureUrl, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a profile
router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await db.query(`DELETE FROM profiles WHERE user_id = $1 RETURNING *;`, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    console.error("Error deleting profile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
