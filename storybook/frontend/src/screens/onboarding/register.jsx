import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import viewIcon from "../../include/images/view.png";
import hideIcon from "../../include/images/hide.png";

//  Redux
import { connect } from "react-redux";
import { register } from "../../store/auth";

function Register({ showAuth, register }) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
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

    register(data, (res) => {
      if (res.status === 200) {
        navigate("/");
      } else {
        toast.error(res?.data?.error?.message);
      }
    });
  };
  const { loading } = showAuth;
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

const mapStateToProps = (state) => {
  return {
    showAuth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data, callback) => dispatch(register(data, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
