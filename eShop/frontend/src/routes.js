import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//  Screens
import HomeScreen from "./screens/homescreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
