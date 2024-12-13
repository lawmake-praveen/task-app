import ApiFunctions from "./task";

import { BaseURL } from "../config";

const headers = {
  "Content-Type": "application/json",
};

const Login = async (body) => {
  const response = await fetch(`${BaseURL}/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
  return response;
};

const Register = async (body) => {
  const response = await fetch(`${BaseURL}/register`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
  return response;
};

const AuthFunctions = {
  Login,
  Register,
};

export default AuthFunctions;
