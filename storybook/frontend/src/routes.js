import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

//  Routes
import StoryLists from "./screens/storyLists";
import StoryDetails from "./screens/storyDetails";
import AddStory from "./screens/addStory";
import Register from "./screens/register";
import Login from "./screens/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<StoryLists />} />
        <Route exact path="/story/:id" element={<StoryDetails />} />
        <Route exact path="/add-story" element={<AddStory />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
