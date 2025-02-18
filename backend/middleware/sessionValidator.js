import jwt from "jsonwebtoken";

export const verifySessionToken = async (req, res, next) => {
  try {
    const splitToken = req.headers.authorization?.split(" ")[1];

    const verified = jwt.verify(splitToken, process.env.SECRET_KEY);
    
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Unauthorised access" });
      return false;
    } else {
      return false;
    }
  }
};
