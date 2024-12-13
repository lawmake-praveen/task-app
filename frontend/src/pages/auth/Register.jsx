import { useState } from "react";
import AuthFunctions from "../../controllers/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    userId: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (registerData.password === registerData.cpassword) {
      const response = await AuthFunctions.Register(registerData);
      const msg = await response.json();
      alert(msg.message);
      if (response.ok) {
        navigate("/");
      }
    } else {
      alert("Password and confirm password should be same");
    }
  };

  return (
    <div className="register-page">
      <form className="register" onSubmit={handleRegister}>
        <h1>Register</h1>
        <input
          type="text"
          className="input"
          placeholder="User ID"
          autoFocus
          required
          value={registerData.userId}
          onChange={(e) => {
            setRegisterData({ ...registerData, userId: e.target.value });
          }}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          required
          onChange={(e) => {
            setRegisterData({ ...registerData, password: e.target.value });
          }}
          value={registerData.password}
        />
        <input
          type="password"
          className="input"
          placeholder="Confirm Password"
          required
          onChange={(e) => {
            setRegisterData({ ...registerData, cpassword: e.target.value });
          }}
          value={registerData.cpassword}
        />
        <input type="submit" value="Register" className="btn-main" />
        <span>
          Already have an account?{" "}
          <a href="" onClick={() => navigate("/")}>
            Login
          </a>
        </span>
      </form>
    </div>
  );
};

export default Register;
