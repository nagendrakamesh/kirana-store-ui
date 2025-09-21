import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../Details";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);

    try{
      const response = await axios.post(`${backend_url}/api/auth/login`, formData);
      // console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userName", response.data.userName);
      navigate("/inventory");
    }
    catch(err){
      if (err.response && err.response.status === 401) {
        alert("Invalid Username or Password!")
      }
      else{
        // console.log(err);
        alert("Something went wrong!")
      }
    }

  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{height: "93vh"}}>
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className="mt-3 text-center">
          <small>
            Don’t have an account?{" "}
            <a href="/register" className="text-decoration-none fw-bold">
              Register
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
