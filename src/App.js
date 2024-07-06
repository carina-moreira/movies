import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Movies from "./pages/Movies/Movies.jsx";

function App() {
  return (
    <div className="app">
      <h1>Inicial Structure</h1>

      <Router>
        <Routes>
          {Home && <Route path="/home" element={<Home />} />}
          {Movies && <Route path="/movies" element={<Movies />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
