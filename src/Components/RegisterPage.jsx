import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../Details";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    storeName: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Register Data:", formData);

    try{
      const response = await axios.post(`${backend_url}/api/auth/register`, formData);
      alert("Successfully Registered!");
      navigate("/login"); 
    }
    catch(err){
      alert("Registration Failed!");
    }
    
  };

  return (
    <div className="bg-light">
      <div className="container d-flex justify-content-center align-items-start pt-5">
        <div className="card shadow-lg p-4 mt-5" style={{ width: "450px" }}>
          <h3 className="text-center mb-4">Register Your Store</h3>
          <form onSubmit={handleSubmit}>
            {/* Store Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Store Name</label>
              <input
                type="text"
                className="form-control"
                name="storeName"
                placeholder="Enter your store name"
                value={formData.storeName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Owner Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Owner Name</label>
              <input
                type="text"
                className="form-control"
                name="ownerName"
                placeholder="Enter owner's full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Store Address</label>
              <textarea
                className="form-control"
                name="address"
                placeholder="Enter store address"
                rows="2"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-warning w-100 fw-bold">
              Register
            </button>
          </form>

          {/* Extra Links */}
          <div className="mt-3 text-center">
            <small>
              Already have an account?{" "}
              <a href="/login" className="text-decoration-none fw-bold">
                Login
              </a>
            </small>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default RegisterPage;
