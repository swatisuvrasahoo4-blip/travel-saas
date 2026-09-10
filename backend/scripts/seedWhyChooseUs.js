import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import Agency from "../models/Agency.js";

dotenv.config();

const seedWhyChooseUs = async () => {
  try {
    await connectDB();

    const agency =
      await Agency.findOne({
        slug: "time-travels",
      });

    if (!agency) {
      console.log(
        "❌ Time Travels agency not found"
      );

      process.exit(1);
    }

    agency.whyChooseUs = {
      heading: "Why Choose Time Travels?",

      description: "",

      backgroundImage:
        "/images/why-choose-bg.png",

      benefits: [
        {
          icon: "gem",
          title: "Local Expertise",
          description:
            "Based in Odisha, we know it best",
        },
        {
          icon: "users",
          title: "Personalized Trips",
          description:
            "Crafted as per your interests",
        },
        {
          icon: "shield-check",
          title: "Trusted & Reliable",
          description:
            "Your safety is our priority",
        },
        {
          icon: "headphones",
          title: "24/7 Support",
          description:
            "Always here for you",
        },
        {
          icon: "heart",
          title: "Memorable Experiences",
          description:
            "More than trips, we create memories",
        },
      ],
    };

    await agency.save();

    console.log(
      "✅ Why Choose Us data seeded successfully"
    );

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error(
      "❌ Why Choose Us seed failed:",
      error
    );

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedWhyChooseUs();