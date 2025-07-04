const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/mongoDB");
const friendRoutes = require("./routes/friendRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const NotificationRoutes = require("./routes/notificationRoutes");

dotenv.config();

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const app = express();

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

// MongoDB Connect
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/notifications", NotificationRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
