import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Agency from "../models/Agency.js";

dotenv.config();

const seedContact = async () => {
  try {
    await connectDB();

    const agency =
      await Agency.findOne({
        slug: "time-travels",
      });

    if (!agency) {
      console.error(
        "❌ Time Travels agency not found."
      );

      process.exit(1);
    }

    agency.phones = [
      "+91 9937081662",
      "+91 9937335612",
    ];

    /*
     * Email and address already belong to the
     * agency. We do not overwrite them here,
     * because those values can vary by agency.
     */

    await agency.save();

    console.log(
      "✅ Contact details seeded successfully."
    );

    console.log({
      agency: agency.name,
      phones: agency.phones,
      email: agency.email,
      address: agency.address,
    });

    process.exit(0);
  } catch (error) {
    console.error(
      "❌ Contact seed failed:",
      error
    );

    process.exit(1);
  }
};

seedContact();