import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

//  Routes
import StoryLists from "./screens/stories/storyLists";
import StoryDetails from "./screens/stories/storyDetails";
import AddStory from "./screens/stories/addStory";
import Register from "./screens/onboarding/register";
import Login from "./screens/onboarding/login";
import MyProfile from "./screens/profile/myProfile";
import EditProfile from "./screens/profile/editProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<StoryLists />} />
        <Route exact path="/story/:id" element={<StoryDetails />} />
        <Route exact path="/add-story" element={<AddStory />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profile" element={<MyProfile />} />
        <Route exact path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
