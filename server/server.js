import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/config.js";
import authRoutes from "./routes/authRoutes.js";
import CauthRoutes from "./routes/CauthRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
const serverless = require('@vendia/serverless-express');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "https://cartify-market-ocb7ag961-muhammad-talhas-projects-a3a7b800.vercel.app",  // Production frontend URL
  "http://localhost:5173",  // Local development frontend URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow requests from listed origins
      } else {
        callback(new Error("Not allowed by CORS")); // Reject requests from other origins
      }
    },
    credentials: true,
  })
);


app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/auth", authRoutes);
app.use("/auth", CauthRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);

app.get('/', (req, res) => {
  res.send('Hello, Vercel!');
});

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports.handler = serverless(app);
