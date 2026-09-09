import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import Agency from "../models/Agency.js";
import Review from "../models/Review.js";

dotenv.config();

const seedReviews = async () => {
  try {
    await connectDB();

    const agency =
      await Agency.findOne({
        slug: "time-travels",
      });

    if (!agency) {
      throw new Error(
        "Time Travels agency not found"
      );
    }

    const reviews = [
      {
        agencyId: agency._id,
        customerName:
          "Priya Sharma",
        customerImage: "",
        rating: 5,
        review:
          "The trip was very well managed. The vehicle was comfortable and the entire journey was smooth and enjoyable.",
        source: "website",
        status: "approved",
        featured: true,
        featuredOrder: 1,
      },
      {
        agencyId: agency._id,
        customerName:
          "Rahul Das",
        customerImage: "",
        rating: 5,
        review:
          "Very good service and helpful coordination throughout our Odisha tour. Everything was planned properly.",
        source: "website",
        status: "approved",
        featured: true,
        featuredOrder: 2,
      },
      {
        agencyId: agency._id,
        customerName:
          "Sneha Mishra",
        customerImage: "",
        rating: 5,
        review:
          "We had a wonderful family trip. The driver was polite and the tour was comfortable from start to finish.",
        source: "website",
        status: "approved",
        featured: true,
        featuredOrder: 3,
      },
      {
        agencyId: agency._id,
        customerName:
          "Amit Kumar",
        customerImage: "",
        rating: 4,
        review:
          "The sightseeing plan was good and the travel arrangements were convenient. Overall a very pleasant experience.",
        source: "website",
        status: "approved",
        featured: true,
        featuredOrder: 4,
      },
      {
        agencyId: agency._id,
        customerName:
          "Neha Patnaik",
        customerImage: "",
        rating: 5,
        review:
          "A memorable tour with good coordination and comfortable travel. We enjoyed every part of the journey.",
        source: "website",
        status: "approved",
        featured: true,
        featuredOrder: 5,
      },
      {
        agencyId: agency._id,
        customerName:
          "Saurav Mohanty",
        customerImage: "",
        rating: 5,
        review:
          "The overall service was excellent. The team was responsive and helped us plan the trip according to our requirements.",
        source: "website",
        status: "approved",
        featured: true,
        featuredOrder: 6,
      },
    ];

    await Review.deleteMany({
      agencyId: agency._id,
      source: "website",
    });

    await Review.insertMany(
      reviews
    );

    console.log(
      "✅ Reviews seeded successfully"
    );
  } catch (error) {
    console.error(
      "❌ Review seed error:",
      error
    );
  } finally {
    await mongoose.connection.close();
  }
};

seedReviews();