import { BrowserRouter, Routes, Route } from "react-router-dom";

//  Routes
import Homescreen from "./screens/homescreen";
import MovieDetails from "./screens/movieDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homescreen />} />
          <Route exact path="/movie-details" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
