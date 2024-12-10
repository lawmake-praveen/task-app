import * as AuthModel from "../model/authModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const userId = req.body.userId;
    const password = req.body.password;
    const [user] = await AuthModel.checkIfUserExist(userId);

    if (user.length > 0) {
      res.status(409).json({ message: "User already exist" });
    } else {
      // const token = await generateToken(req.body);
      const addUser = await AuthModel.addUser(userId, password);
      res.send({ message: "User registered successfully" });
    }
  } catch (error) {
    console.log(`Error : ${error}`);
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
      // const token = await generateToken(req.body);
      const [validateUser] = await AuthModel.validateUser(userId, password);
      if (validateUser != undefined && validateUser.length == 1) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(409).json({ message: "Invalid credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const SECRET_KEY =
  "dknfgiudfgbilu8-=ejhwpowjysh83659840dkjdbhi34736rberkeuhfui";

const generateToken = async (body) => {
  const token = jwt.sign(body, SECRET_KEY);
  console.log(token);
  return token;
};
