/**
 * Simple middleware to verify administrator access based on a pre-shared pin/password.
 */
const protectAdmin = (req, res, next) => {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const providedPassword = req.headers['x-admin-password'];

  if (!providedPassword || providedPassword !== adminPassword) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Invalid or missing administrator password.',
    });
  }

  next();
};

module.exports = { protectAdmin };
