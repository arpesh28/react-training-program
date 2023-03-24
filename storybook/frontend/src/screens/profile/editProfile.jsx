import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

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
      newUser.profilePicture = response.data[0];
      setUser(newUser);
    });
  };
  const handleSubmit = (e) => {
    setLoading(true);
    const payLoad = {
      data: {
        profilePicture: user?.profilePicture?.id,
      },
    };
    console.log("called:");
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
        console.log("err:", err);
      });
  };

  return (
    <div className="container py-5">
      <Header page={"Edit Profile"} />
      <div className=" mt-5">
        <div className="form-group my-3">
          <label htmlFor="">Profile Picture</label>
          <br />
          <input type="file" onChange={uploadImage} />
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
        Edit Image
      </button>
    </div>
  );
}
