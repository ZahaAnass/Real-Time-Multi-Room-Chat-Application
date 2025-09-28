const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes placeholder
app.get("/", (req, res) => {
  res.send("API is running...");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log("✅ MongoDB Connected...");
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
})
.catch((err) => console.error(err));
