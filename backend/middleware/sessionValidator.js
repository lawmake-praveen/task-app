import { SECRET_KEY } from "../controller/authController.js";
import jwt from "jsonwebtoken";

export const verifySessionToken = async (req, res, next) => {
  try {
    const splitToken = req.headers.authorization?.split(" ")[1];

    console.log(`Token from headers : ${JSON.stringify(splitToken)}`);

    const verified = jwt.verify(splitToken, SECRET_KEY);
    console.log(`verified : ${JSON.stringify(verified)}`);
    
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
