const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const port = process.env.PORT || 3000;

// connectDB
const connectDB = require("./config/connect")

// Middleware
const authenticateUser = require("./middleware/authMiddleware")
const notFoundMiddleware = require("./middleware/notFound")
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("<h1>Alpha Chat</h1>")
})

// routers
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const roomRouter = require("./routes/room")
const messageRouter = require("./routes/message")

// Routes
app.use("/api/auth", authRouter)
app.use("/api/user", authenticateUser, userRouter)
app.use("/api/room", authenticateUser, roomRouter)
app.use("/api/message", authenticateUser, messageRouter)

// Error handler
app.use(notFoundMiddleware)

const start = async () => {
  try{
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  }catch(err){
    console.log(err)
  }
}

start();