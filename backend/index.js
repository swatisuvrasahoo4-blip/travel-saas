import dns from "dns/promises";

import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import helmet from "helmet";

import rateLimit from "express-rate-limit";

import agencyRoutes from "./routes/agency.js";

import destinationRoutes from "./routes/destination.js";

import packageRoutes from "./routes/package.js";

import reviewRoutes from "./routes/review.js";

import galleryRoutes from "./routes/gallery.js";

import vehicleRoutes from "./routes/vehicle.js";

import contactMessageRoutes from "./routes/contactMessage.js";

import enquiryRoutes from "./routes/enquiry.js";

import connectDB from "./config/db.js";

/* =========================================
   DNS
========================================= */

dns.setServers([
  "1.1.1.1",
  "8.8.8.8",
]);

/* =========================================
   ENVIRONMENT VARIABLES
========================================= */

dotenv.config();

/* =========================================
   EXPRESS APP
========================================= */

const app = express();

/* =========================================
   TRUST PROXY
========================================= */

app.set("trust proxy", 1);

/* =========================================
   SECURITY HEADERS
========================================= */

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

/* =========================================
   CORS
========================================= */

const allowedOrigins = (
  process.env.FRONTEND_URLS ||
  process.env.FRONTEND_URL ||
  ""
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      /*
       * Allow requests without an Origin
       * header, such as server-to-server
       * requests.
       */

      if (!origin) {
        return callback(
          null,
          true
        );
      }

      /*
       * Allow configured frontend domains.
       */

      if (
        allowedOrigins.includes(
          origin
        )
      ) {
        return callback(
          null,
          true
        );
      }

      /*
       * Block unknown origins.
       */

      return callback(
        new Error(
          "Not allowed by CORS"
        )
      );
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,
  })
);

/* =========================================
   GLOBAL RATE LIMIT
========================================= */

const apiLimiter = rateLimit({
  windowMs:
    15 * 60 * 1000,

  limit: 300,

  standardHeaders:
    "draft-8",

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});

app.use(apiLimiter);

/* =========================================
   BODY PARSING
========================================= */

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  express.urlencoded({
    limit: "1mb",
    extended: true,
  })
);

/* =========================================
   HEALTH ROUTE
========================================= */

app.get(
  "/",
  (req, res) => {
    res.status(200).json({
      success: true,
      message:
        "Travel SaaS backend is running",
    });
  }
);

/* =========================================
   ROUTES
========================================= */

app.use(
  "/agency",
  agencyRoutes
);

app.use(
  "/destination",
  destinationRoutes
);

app.use(
  "/package",
  packageRoutes
);

app.use(
  "/review",
  reviewRoutes
);

app.use(
  "/gallery",
  galleryRoutes
);

app.use(
  "/vehicle",
  vehicleRoutes
);

app.use(
  "/contact-message",
  contactMessageRoutes
);

app.use(
  "/enquiry",
  enquiryRoutes
);

/* =========================================
   404 HANDLER
========================================= */

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message:
        "Route not found",
    });
  }
);

/* =========================================
   GLOBAL ERROR HANDLER
========================================= */

app.use(
  (
    error,
    req,
    res,
    next
  ) => {
    console.error(error);

    /*
     * CORS error
     */

    if (
      error.message ===
      "Not allowed by CORS"
    ) {
      return res
        .status(403)
        .json({
          success: false,
          message:
            "Origin is not allowed.",
        });
    }

    /*
     * General server error
     */

    return res
      .status(500)
      .json({
        success: false,
        message:
          "Internal server error",
      });
  }
);

/* =========================================
   SERVER
========================================= */

const PORT =
  process.env.PORT ||
  5000;

const startServer =
  async () => {
    try {
      await connectDB();

      app.listen(
        PORT,
        () => {
          console.log(
            `🚀 Server running on port ${PORT}`
          );
        }
      );
    } catch (error) {
      console.error(
        "❌ Unable to start server:",
        error
      );

      process.exit(1);
    }
  };

startServer();