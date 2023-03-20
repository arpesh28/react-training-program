import React, { useState } from "react";
import viewIcon from "../include/images/view.png";
import hideIcon from "../include/images/hide.png";

export default function Login() {
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
      </div>
    </div>
  );
}
