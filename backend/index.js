import dns from "dns/promises";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import agencyRoutes from "./routes/agency.js";
import destinationRoutes from "./routes/destination.js";
import packageRoutes from "./routes/package.js";
import reviewRoutes from "./routes/review.js";
import galleryRoutes from "./routes/gallery.js";

import connectDB from "./config/db.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use(cors());

app.use(express.json({ limit: "10mb" }));

app.use(
  express.urlencoded({
    limit: "10mb",
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Travel SaaS backend is running");
});

app.use("/agency", agencyRoutes);
app.use("/destination", destinationRoutes);
app.use("/package", packageRoutes);
app.use("/review", reviewRoutes);
app.use("/gallery", galleryRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();