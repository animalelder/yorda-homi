



const fs = require("fs");
const path = require("path");

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const multer = require("multer");

const app = express();

const db = require("./db");

const properties = require("./routes/properties");
const users = require("./routes/users");
const messages = require("./routes/messages");


// Create the public/uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "public/uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Save files in public/uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Generate a unique filename
  },
});

const upload = multer({ storage });

function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8",
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

module.exports = function application(ENV) {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));


  // Serve static files from the public folder
  app.use(express.static(path.join(__dirname, "public")));
  console.log("Initializing users route...");
  app.use("/api/users", users(db));
  app.use("/api/properties", properties(db, upload)); // Pass Multer to the properties route
  app.use("/api/messages", messages(db));
 
   // Mount the users router

  // Debug reset route for development or testing
  if (ENV === "development" || ENV === "test") {
    Promise.all([
      read(path.resolve(__dirname, `db/schema/create.sql`)),
      read(path.resolve(__dirname, `db/schema/${ENV}.sql`)),
    ])
      .then(([create, seed]) => {
        app.get("/api/debug/reset", (request, response) => {
          db.query(create)
            .then(() => db.query(seed))
            .then(() => {
              response.status(200).send("Database Reset");
            });
        });
      })
      .catch((error) => {
        console.log(`Error setting up the reset route: ${error}`);
      });
  }

  app.close = function () {
    return db.end();
  };

  return app;
};
