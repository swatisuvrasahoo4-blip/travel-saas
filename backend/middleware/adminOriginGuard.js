const getAllowedOrigins = () => {
  const rawOrigins =
    process.env.FRONTEND_URLS ||
    process.env.FRONTEND_URL ||
    "";

  return rawOrigins
    .split(",")
    .map((origin) =>
      origin.trim()
    )
    .filter(Boolean);
};

export const requireAllowedAdminOrigin = (
  req,
  res,
  next
) => {
  const origin =
    req.get("origin");

  /*
   * Some server-to-server requests
   * may not contain Origin.
   */
  if (!origin) {
    return next();
  }

  const allowedOrigins =
    getAllowedOrigins();

  if (
    !allowedOrigins.includes(origin)
  ) {
    return res.status(403).json({
      success: false,
      message:
        "Request origin is not allowed.",
    });
  }

  return next();
};