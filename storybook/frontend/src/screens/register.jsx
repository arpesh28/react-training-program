import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const onChange = (e) => {
    const newData = structuredClone(data);
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}auth/local/register`,
      data,
    }).then((response) => {
      localStorage.setItem("jwt", response.data.jwt);
      navigate("/");
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
        <br />
        <input
          type="text"
          name="email"
          placeholder="Type an email"
          className="my-3"
          value={data.email}
          onChange={onChange}
        />
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
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Register
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
