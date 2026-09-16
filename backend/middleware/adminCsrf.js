import crypto from "crypto";

/* =========================================
   CSRF COOKIE OPTIONS
========================================= */

const getCsrfCookieOptions = () => {
  const isProduction =
    process.env.NODE_ENV === "production";

  return {
    httpOnly: false,
    secure: isProduction,
    sameSite: isProduction
      ? "none"
      : "lax",
    maxAge:
      3 * 24 * 60 * 60 * 1000,
  };
};

/* =========================================
   CREATE CSRF TOKEN
========================================= */

export const createAdminCsrfToken = (
  res
) => {
  const token = crypto
    .randomBytes(32)
    .toString("hex");

  res.cookie(
    "admin_csrf",
    token,
    getCsrfCookieOptions()
  );

  return token;
};

/* =========================================
   VERIFY CSRF TOKEN
========================================= */

export const requireAdminCsrf = (
  req,
  res,
  next
) => {
  if (
    req.method === "GET" ||
    req.method === "HEAD" ||
    req.method === "OPTIONS"
  ) {
    return next();
  }

  const cookieToken =
    req.cookies?.admin_csrf;

  const headerToken =
    req.get("X-CSRF-Token");

  if (
    !cookieToken ||
    !headerToken
  ) {
    return res.status(403).json({
      success: false,
      message:
        "Invalid security token.",
    });
  }

  const cookieBuffer = Buffer.from(
    cookieToken
  );

  const headerBuffer = Buffer.from(
    headerToken
  );

  if (
    cookieBuffer.length !==
    headerBuffer.length
  ) {
    return res.status(403).json({
      success: false,
      message:
        "Invalid security token.",
    });
  }

  const tokenMatches =
    crypto.timingSafeEqual(
      cookieBuffer,
      headerBuffer
    );

  if (!tokenMatches) {
    return res.status(403).json({
      success: false,
      message:
        "Invalid security token.",
    });
  }

  return next();
};