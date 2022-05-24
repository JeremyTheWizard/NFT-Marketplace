import Navbar from "./components/Navbar.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import ErrorPage from "./pages/ErrorPage.js";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/marketplace" element={<Home />} />
        <Route path="/profile/:username" element={<profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
