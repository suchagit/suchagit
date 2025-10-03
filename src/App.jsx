import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Invite from "./pages/Invite"; // Make sure this is imported
import Registry from "./pages/Registry";
import Gallery from "./pages/Gallery";
import Directions from "./pages/Directions";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex-grow">
        <Routes>
          {/*<Route path="/invite/:token" element={<Invite />} />*/}
          <Route path="/invite/:inviteId?" element={<Invite />} />
          <Route path="/:inviteId?" element={<Home />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/directions" element={<Directions />} />
        </Routes>
      </div>
      <footer className="text-center py-4 text-gray-500 text-sm">
        © 2025 Boyd & Rejoice
      </footer>
    </Router>
  );
}

export default App;
