require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/oneafrica_dev";

// Basic env validation
const required = ["JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET", "MONGODB_URI"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.warn("Warning: missing env vars -", missing.join(", "));
}

let server;

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    server = app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

// Graceful shutdown
const shutdown = async () => {
  console.log("Shutting down...");
  try {
    if (server) server.close();
    await mongoose.disconnect();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
