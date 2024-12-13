import React, { useState } from "react";
import AuthFunctions from "../../controllers/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    userId: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(loginData);

    const response = await AuthFunctions.Login(loginData);
    const msg = await response.json();
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(msg.user));
      localStorage.setItem("accessToken", JSON.stringify(msg.accessToken));
      navigate("/taskList");
    } else {
      alert(msg.message);
    }
  };

  return (
    <div className="login-page">
      <form className="login" onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="text"
          className="input"
          placeholder="User ID"
          required
          autoFocus
          value={loginData.userId}
          onChange={(e) => {
            setLoginData({ ...loginData, userId: e.target.value });
          }}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          required
          onChange={(e) => {
            setLoginData({ ...loginData, password: e.target.value });
          }}
          value={loginData.password}
        />
        <input type="submit" value="Login" className="btn-main" />
        <span>
          Don't have an account?{" "}
          <a href="" onClick={() => navigate("/register")}>
            Register
          </a>
        </span>
      </form>
    </div>
  );
};

export default Login;
