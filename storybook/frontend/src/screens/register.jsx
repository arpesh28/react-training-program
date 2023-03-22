import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import viewIcon from "../include/images/view.png";
import hideIcon from "../include/images/hide.png";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const newData = structuredClone(data);
    const newErrors = structuredClone(errors);
    newData[e.target.name] = e.target.value;
    delete newErrors[e.target.name];
    setErrors(newErrors);
    setData(newData);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const newErrors = structuredClone(errors);
    if (!data.username) newErrors.username = "Username is required";
    if (!data.email) newErrors.email = "Email is required";
    if (!data.password) newErrors.password = "Password is required";
    else if (data.password.length < 5)
      newErrors.password = "Password must be of length greater than 4";

    if (newErrors.username || newErrors.password || newErrors.email)
      return setErrors(newErrors);
    setLoading(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}auth/local/register`,
      data,
    })
      .then((response) => {
        localStorage.setItem("jwt", response.data.jwt);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.error.message);
        setLoading(false);
      });
  };
  return (
    <div className="container d-flex w-100 onboarding-wrapper align-items-center justify-content-center">
      <div className="text-center onboarding-inputs">
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Type a username"
          className="my-3"
          value={data.username}
          onChange={onChange}
        />
        {errors?.username && <div className="error">{errors.username}</div>}
        <br />
        <input
          type="text"
          name="email"
          placeholder="Type an email"
          className="my-3"
          value={data.email}
          onChange={onChange}
        />
        {errors?.email && <div className="error">{errors.email}</div>}
        <br />
        <div className="form-group position-relative">
          <input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Type a password"
            className="my-3"
            value={data.password}
            onChange={onChange}
          />
          {data.password && (
            <img
              src={showPass ? hideIcon : viewIcon}
              alt=""
              className="hover"
              onClick={(e) => {
                setShowPass(!showPass);
              }}
            />
          )}
          {errors?.password && <div className="error">{errors.password}</div>}
        </div>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Register"}
        </button>

        <div>
          Already have an account?{" "}
          <button
            className="btn btn-link"
            onClick={(e) => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
