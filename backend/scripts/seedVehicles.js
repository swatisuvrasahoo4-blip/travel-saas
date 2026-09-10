import mongoose from "mongoose";
import dotenv from "dotenv";

import Vehicle from "../models/Vehicle.js";
import Agency from "../models/Agency.js";

dotenv.config();

const seedVehicles = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("✅ Connected to MongoDB");

    const agency = await Agency.findOne({
      name: "Time Travels",
    });

    if (!agency) {
      console.log("❌ Time Travels agency not found.");
      process.exit(1);
    }

    await Vehicle.deleteMany({
      agencyId: agency._id,
    });

    const vehicles = [
      {
        agencyId: agency._id,
        name: "Innova",
        seater: "7-8 Seater",
        image: "/images/vehicles/innova.webp",
        features: [
          "Air Conditioned",
          "Comfortable Seating",
          "Professional Driver",
          "Ideal for Family Travel",
        ],
        isAvailable: true,
        displayOrder: 1,
      },
      {
        agencyId: agency._id,
        name: "Tempo Traveller",
        seater: "13-25 Seater",
        image: "/images/vehicles/tempo-traveller.jpg",
        features: [
          "Air Conditioned",
          "Multiple Seating Options",
          "Spacious Interior",
          "Ideal for Group Travel",
        ],
        isAvailable: true,
        displayOrder: 2,
      },
      {
        agencyId: agency._id,
        name: "Urbania",
        seater: "17 Seater",
        image: "/images/vehicles/urbania.jpg",
        features: [
          "Premium Interior",
          "Air Conditioned",
          "Comfortable Seating",
          "Ideal for Premium Group Travel",
        ],
        isAvailable: true,
        displayOrder: 3,
      },
      {
        agencyId: agency._id,
        name: "SML",
        seater: "33 Seater",
        image: "/images/vehicles/sml.png",
        features: [
          "Large Seating Capacity",
          "Air Conditioned",
          "Spacious Interior",
          "Ideal for Large Groups",
        ],
        isAvailable: true,
        displayOrder: 4,
      },
    ];

    await Vehicle.insertMany(vehicles);

    console.log("✅ Time Travels vehicles seeded successfully.");

    console.log({
      agency: agency.name,
      vehicles: vehicles.map((vehicle) => ({
        name: vehicle.name,
        seater: vehicle.seater,
        image: vehicle.image,
      })),
    });

    await mongoose.disconnect();

    process.exit(0);
  } catch (error) {
    console.error("❌ Vehicle seed failed:", error);

    await mongoose.disconnect();

    process.exit(1);
  }
};

seedVehicles();