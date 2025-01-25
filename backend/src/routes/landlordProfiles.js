const router = require("express").Router();

module.exports = (db) => {
  // Fetch landlord profile
  router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      // Fetch landlord profile
      const landlordResult = await db.query("SELECT * FROM landlord_profiles WHERE user_id = $1;", [id]);
      if (landlordResult.rows.length === 0) {
        return res.status(404).json({ error: "Landlord profile not found." });
      }

      res.json(landlordResult.rows[0]);
    } catch (error) {
      console.error("Error fetching landlord profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Update landlord profile
  router.put("/", async (req, res) => {
    const { user_id, firstname, lastname, phone_number, profile_picture_url, pet_friendly } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required." });
    }

    try {
      await db.query(
        `UPDATE landlord_profiles
         SET firstname = $1,
             lastname = $2,
             phone_number = $3,
             profile_picture_url = $4,
             pet_friendly = $5
         WHERE user_id = $6;`,
        [firstname, lastname, phone_number, profile_picture_url, pet_friendly, user_id]
      );
      res.json({ message: "Landlord profile updated successfully." });
    } catch (error) {
      console.error("Error updating landlord profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router;
};
