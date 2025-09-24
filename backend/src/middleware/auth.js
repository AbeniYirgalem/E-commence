const jwt = require("jsonwebtoken");

const authMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer "))
      return res.status(401).json({ message: "Unauthorized" });
    const token = auth.split(" ")[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.user = { id: payload.id, role: payload.role };
      if (allowedRoles.length && !allowedRoles.includes(payload.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = { authMiddleware };
