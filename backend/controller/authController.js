import * as AuthModel from "../model/authModel.js";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import { format } from "date-fns";

export const register = async (req, res) => {
  try {
    const userId = req.body.userId;
    const password = req.body.password;
    const [user] = await AuthModel.checkIfUserExist(userId);

    if (user.length > 0) {
      res.status(409).json({ message: "User already exist" });
    } else {
      const hashedPassword = await generateHashPassword(password);
      await AuthModel.addUser(userId, hashedPassword);
      res.send({ message: "User registered successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const login = async (req, res) => {
  try {
    const userId = req.body.userId;
    const password = req.body.password;
    const [user] = await AuthModel.checkIfUserExist(userId);

    if (user.length == 0) {
      res.status(409).json({ message: "User doesn't exist" });
    } else {
      const [hashedPassword] = await AuthModel.getPassword(userId);

      const verified = await verifyPassword(
        password,
        hashedPassword[0].password
      );
      if (verified) {
        const token = await generateSessionToken(req.body);
        await AuthModel.updateAccessToken(token, userId);

        const currentDateTime = new Date();
        const dateTime = format(currentDateTime, "yyyy-MM-dd HH:mm:ss");

        await AuthModel.updateLastLogin(dateTime, userId);

        res.status(200).json({
          message: "Login successful",
          user: userId,
          accessToken: token,
        });
      } else {
        res.status(409).json({ message: "Invalid credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const generateSessionToken = async (body) => {
  const token = jwt.sign(body, process.env.SECRET_KEY, { expiresIn: "5m" });
  return token;
};

const generateHashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
