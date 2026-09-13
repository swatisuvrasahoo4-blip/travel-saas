import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";
import Agency from "../models/Agency.js";
import Admin from "../models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const adminName =
      process.env.ADMIN_NAME;

    const adminEmail =
      process.env.ADMIN_EMAIL
        ?.trim()
        .toLowerCase();

    const adminPassword =
      process.env.ADMIN_PASSWORD;

    if (
      !adminName ||
      !adminEmail ||
      !adminPassword
    ) {
      console.error(
        "ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD are required."
      );

      process.exit(1);
    }

    if (
      adminPassword.length < 12
    ) {
      console.error(
        "ADMIN_PASSWORD must be at least 12 characters long."
      );

      process.exit(1);
    }

    /*
     * This temporary script creates
     * only the Time Travels admin.
     */
    const agency =
      await Agency.findOne({
        slug: "time-travels",
        status: "active",
      });

    if (!agency) {
      console.error(
        "Time Travels agency not found."
      );

      process.exit(1);
    }

    /*
     * Prevent duplicate admin accounts.
     */
    const existingAdmin =
      await Admin.findOne({
        email: adminEmail,
      });

    if (existingAdmin) {
      console.error(
        "An admin with this email already exists."
      );

      process.exit(1);
    }

    /*
     * Never store the plain password.
     */
    const hashedPassword =
      await bcrypt.hash(
        adminPassword,
        12
      );

    const admin =
      await Admin.create({
        agencyId:
          agency._id,

        name:
          adminName,

        email:
          adminEmail,

        password:
          hashedPassword,

        role:
          "owner",

        status:
          "active",
      });

    console.log(
      "✅ Admin created successfully"
    );

    console.log(
      `Agency: ${agency.name}`
    );

    console.log(
      `Admin: ${admin.email}`
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "❌ Unable to create admin:",
      error
    );

    process.exit(1);
  }
};

createAdmin();