const jwt = require('jsonwebtoken');

// Middleware to verify token
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  // Remove 'Bearer ' prefix if present
  const bearerToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

  try {
    // Verify the token
    const verified = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = verified; // Attach user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // Handle token verification errors
    res.status(400).json({ message: 'Invalid Token' });
  }
};
