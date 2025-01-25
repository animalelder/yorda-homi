const router = require("express").Router();

module.exports = (db) => {
  

  router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const tenantResult = await db.query("SELECT * FROM tenant_profiles WHERE user_id = $1;", [id]);
      if (tenantResult.rows.length === 0) {
        return res.status(404).json({ error: "Tenant profile not found." });
      }

      const tenantProfile = tenantResult.rows[0];

      // If the `favorites` column is null, initialize it as an empty array
      tenantProfile.favorites = tenantProfile.favorites || [];

      res.json(tenantProfile);
    } catch (error) {
      console.error("Error fetching tenant profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });



  router.post("/favorites/add", async (req, res) => {
    const { tenant_id, property_id } = req.body;
  
    if (!tenant_id || !property_id) {
      return res.status(400).json({ error: "Tenant ID and Property ID are required." });
    }
  
    try {
      // Fetch the current favorites
      const result = await db.query("SELECT favorites FROM tenant_profiles WHERE user_id = $1;", [
        tenant_id,
      ]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Tenant profile not found." });
      }
  
      const currentFavorites = result.rows[0].favorites || [];
      if (!currentFavorites.includes(property_id)) {
        currentFavorites.push(property_id); // Add the property ID to the favorites
      }
  
      // Update the favorites column
      await db.query("UPDATE tenant_profiles SET favorites = $1 WHERE user_id = $2;", [
        JSON.stringify(currentFavorites), // Convert the array to JSON
        tenant_id,
      ]);
  
      res.status(201).json({ message: "Property added to favorites." });
    } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  



router.post("/favorites/remove", async (req, res) => {
  const { tenant_id, property_id } = req.body;

  if (!tenant_id || !property_id) {
    return res.status(400).json({ error: "Tenant ID and Property ID are required." });
  }

  try {
    // Fetch the current favorites
    const result = await db.query("SELECT favorites FROM tenant_profiles WHERE user_id = $1;", [
      tenant_id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tenant profile not found." });
    }

    let currentFavorites = result.rows[0].favorites || [];
    currentFavorites = currentFavorites.filter((id) => id !== property_id); // Remove the property ID

    // Update the favorites column
    await db.query("UPDATE tenant_profiles SET favorites = $1 WHERE user_id = $2;", [
      JSON.stringify(currentFavorites), // Convert the array to JSON
      tenant_id,
    ]);

    res.status(200).json({ message: "Property removed from favorites." });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

   return router;
 };
