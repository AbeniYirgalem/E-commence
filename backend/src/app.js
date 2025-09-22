const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes/index");
const requestId = require("./middleware/requestId");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// Middlewares
app.use(requestId);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// API routes
app.use("/api", routes);

// Provide a small root response so GET / returns a helpful JSON instead of 404
app.get("/", (req, res) =>
  res.json({ message: "OneAfrica Trade API", api: "/api", health: "/health" })
);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Error handler (must be after routes)
app.use(errorHandler);

module.exports = app;
