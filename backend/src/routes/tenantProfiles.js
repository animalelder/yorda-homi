const router = require("express").Router();

module.exports = (db) => {
  // Fetch tenant profile with favorites
  router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      // Fetch tenant profile
      const tenantResult = await db.query("SELECT * FROM tenant_profiles WHERE user_id = $1;", [id]);
      if (tenantResult.rows.length === 0) {
        return res.status(404).json({ error: "Tenant profile not found." });
      }

      const tenantProfile = tenantResult.rows[0];

      // Fetch tenant's favorite properties
      const favoritesResult = await db.query(
        `SELECT p.* FROM properties p
         INNER JOIN favorites f ON p.id = f.property_id
         WHERE f.tenant_id = $1;`,
        [id]
      );

      // Combine tenant profile and favorites
      res.json({
        ...tenantProfile,
        favorites: favoritesResult.rows,
      });
    } catch (error) {
      console.error("Error fetching tenant profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Add property to tenant's favorites
  router.post("/favorites/add", async (req, res) => {
    const { tenant_id, property_id } = req.body;

    if (!tenant_id || !property_id) {
      return res.status(400).json({ error: "Tenant ID and Property ID are required." });
    }

    try {
      await db.query(
        `INSERT INTO favorites (tenant_id, property_id) VALUES ($1, $2)
         ON CONFLICT (tenant_id, property_id) DO NOTHING;`,
        [tenant_id, property_id]
      );
      res.status(201).json({ message: "Property added to favorites." });
    } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Remove property from tenant's favorites
  router.post("/favorites/remove", async (req, res) => {
    const { tenant_id, property_id } = req.body;

    if (!tenant_id || !property_id) {
      return res.status(400).json({ error: "Tenant ID and Property ID are required." });
    }

    try {
      await db.query("DELETE FROM favorites WHERE tenant_id = $1 AND property_id = $2;", [
        tenant_id,
        property_id,
      ]);
      res.status(200).json({ message: "Property removed from favorites." });
    } catch (error) {
      console.error("Error removing favorite:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router;
};
