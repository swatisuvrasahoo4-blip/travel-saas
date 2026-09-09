import dotenv from "dotenv";
import mongoose from "mongoose";

import Agency from "../models/Agency.js";
import GalleryItem from "../models/GalleryItem.js";

dotenv.config();

const seedGallery = async () => {
  try {
    const databaseUrl =
      process.env.MONGODB_URL;

    if (!databaseUrl) {
      throw new Error(
        "MONGODB_URL is not defined"
      );
    }

    await mongoose.connect(
      databaseUrl
    );

    console.log(
      "✅ Connected to MongoDB"
    );

    const agency =
      await Agency.findOne({
        domain: "localhost",
      });

    if (!agency) {
      throw new Error(
        "Time Travels agency not found"
      );
    }

    await GalleryItem.deleteMany({
      agencyId: agency._id,
    });

    const galleryItems = [
      {
        imageUrl:
          "/images/destinations/bhubaneswar/lingaraj-temple.png",
        caption:
          "Lingaraj Temple",
        category:
          "tour-moment",
        featured: true,
        featuredOrder: 1,
        status: "active",
      },
      {
        imageUrl:
          "/images/destinations/puri/puri-beach.png",
        caption:
          "Puri Beach",
        category:
          "customer-trip",
        featured: true,
        featuredOrder: 2,
        status: "active",
      },
      {
        imageUrl:
          "/images/destinations/konark/chandrabhaga-beach.png",
        caption:
          "Chandrabhaga Beach",
        category:
          "tour-moment",
        featured: true,
        featuredOrder: 3,
        status: "active",
      },
      {
        imageUrl:
          "/images/destinations/daringbadi/midubanda-waterfall.png",
        caption:
          "Midubanda Waterfall",
        category:
          "tour-moment",
        featured: true,
        featuredOrder: 4,
        status: "active",
      },
      {
        imageUrl:
          "/images/destinations/bhubaneswar/nandankanan.png",
        caption:
          "Nandankanan",
        category:
          "customer-trip",
        featured: true,
        featuredOrder: 5,
        status: "active",
      },
      {
        imageUrl:
          "/images/destinations/konark/sun-temple.png",
        caption:
          "Konark Sun Temple",
        category:
          "tour-moment",
        featured: true,
        featuredOrder: 6,
        status: "active",
      },
    ];

    const records =
      galleryItems.map(
        (item) => ({
          ...item,
          agencyId: agency._id,
        })
      );

    await GalleryItem.insertMany(
      records
    );

    console.log(
      "✅ Gallery seeded successfully"
    );
  } catch (error) {
    console.error(
      "❌ Gallery seed error:",
      error.message
    );
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

seedGallery();