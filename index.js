require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./configs/swagger");

const app = express();
const allowedOrigins = [
  "https://giasuai-be.onrender.com/",
  "http://127.0.0.1:5500", // test local FE
  "http://localhost:4000", // test local BE
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

app.use("/", authRoutes);
app.use("/", userRoutes);

// Test
app.get("/", (req, res) => res.send("Backend is running 🔥"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
