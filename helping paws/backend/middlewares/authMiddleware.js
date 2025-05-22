import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = (roles = []) => {
  return async (req, res, next) => {
    if (typeof roles === "string") {
      roles = [roles];
    }

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded._id).select("-password"); 

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Not authorized for this route" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
