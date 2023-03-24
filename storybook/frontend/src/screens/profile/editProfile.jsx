import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [usernameChanged, setUsernameChanged] = useState(false);

  const uploadImage = (e) => {
    setLoadingImage(true);
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}upload`,
      data: formData,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    }).then((response) => {
      setLoadingImage(false);
      const newUser = structuredClone(user);
      const newErrors = structuredClone(errors);
      newUser.profilePicture = response.data[0];
      delete newErrors.profilePicture;
      setErrors(newErrors);
      setUser(newUser);
    });
  };
  const handleSubmit = (e) => {
    const newErrors = structuredClone(errors);
    if (!user?.profilePicture)
      newErrors.profilePicture = "Profile Picture is required";
    if (!user?.username) newErrors.username = "Username is required";
    if (newErrors.username || newErrors.profilePicture)
      return setErrors(newErrors);

    setLoading(true);
    const payLoad = {
      profilePicture: user?.profilePicture?.id,
    };
    if (usernameChanged) payLoad.username = user?.username;
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}users/14`,
      data: payLoad,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
      .then((response) => {
        setLoading(false);
        navigate("/profile");
      })
      .catch((err) => {
        setLoading(false);
        console.log("err:", err);
      });
  };

  return (
    <div className="container py-5">
      <Header page={"Edit Profile"} />
      <div className=" mt-5">
        <div className="form-group my-3">
          <label htmlFor="">Username</label>
          <br />
          <input
            type="text"
            value={user?.username}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
              setUsernameChanged(true);
              const newErrors = structuredClone(errors);
              delete newErrors.username;
              setErrors(newErrors);
            }}
          />
          {errors?.username && <div className="error">{errors.username}</div>}
        </div>
        <div className="form-group my-3">
          <label htmlFor="">Profile Picture</label>
          <br />
          <input type="file" onChange={uploadImage} />
          {errors?.profilePicture && (
            <div className="error">{errors.profilePicture}</div>
          )}
        </div>
        <div className="image-preview">
          <img
            src={process.env.REACT_APP_IMAGE_URL + user?.profilePicture?.url}
            alt=""
          />
        </div>
      </div>
      <button
        className="btn btn-primary mt-2"
        onClick={handleSubmit}
        disabled={loadingImage || loading}
      >
        Edit Profile
      </button>
    </div>
  );
}
