const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  // Example route to fetch all messages
  router.get("/", (req, res) => {
    db.query("SELECT * FROM messages;")
      .then(({ rows }) => res.json(rows))
      .catch((err) => {
        console.error("Error fetching messages:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

  return router;
};
