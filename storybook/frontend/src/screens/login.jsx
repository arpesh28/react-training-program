import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//  Images
import viewIcon from "../include/images/view.png";
import hideIcon from "../include/images/hide.png";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
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
    delete newErrors.apiErr;
    setData(newData);
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    let newErrors = structuredClone(errors);
    if (!data.email) newErrors.email = "Email or username is required";
    if (!data.password) newErrors.password = "Password is required";
    if (newErrors.email || newErrors.password) {
      return setErrors(newErrors);
    }
    setLoading(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}auth/local/`,
      data: {
        identifier: data.email,
        password: data.password,
      },
    })
      .then((response) => {
        console.log("response:", response);
        localStorage.setItem("jwt", response.data.jwt);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        const newErrors = structuredClone(errors);
        newErrors.apiErr = err?.response?.data?.error?.message;
        setErrors(newErrors);
        setLoading(false);
      });
  };

  console.log("state errors:", errors);

  return (
    <div className="container d-flex w-100 onboarding-wrapper align-items-center justify-content-center">
      <div className="text-center onboarding-inputs">
        <h2>Login</h2>
        <input
          type="text"
          name="email"
          placeholder="Enter your email or username"
          className="my-3"
          value={data.email}
          onChange={onChange}
        />
        {errors?.email && (
          <div className="error">Email or username is required</div>
        )}
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
        {errors?.password && <div className="error">Password is required</div>}
        {errors?.apiErr && <div className="error">{errors.apiErr}</div>}
        <button className="btn btn-primary" onClick={handleSubmit}>
          {loading ? "Loading..." : "Login"}
        </button>
        <div>
          Don't have an account?{" "}
          <button
            className="btn btn-link"
            onClick={(e) => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
