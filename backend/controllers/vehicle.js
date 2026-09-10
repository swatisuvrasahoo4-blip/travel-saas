import Vehicle from "../models/Vehicle.js";
import Agency from "../models/Agency.js";

export const getVehiclesByDomain = async (
  req,
  res
) => {
  try {
    const { domain } = req.params;

    if (!domain) {
      return res.status(400).json({
        success: false,
        message: "Domain is required.",
      });
    }

    const agency = await Agency.findOne({
      domains: domain,
    });

    if (!agency) {
      return res.status(404).json({
        success: false,
        message: "Agency not found.",
      });
    }

    const vehicles = await Vehicle.find({
      agencyId: agency._id,
      isAvailable: true,
    }).sort({
      displayOrder: 1,
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      vehicles,
    });
  } catch (error) {
    console.error(
      "Get vehicles by domain error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch vehicles.",
    });
  }
};