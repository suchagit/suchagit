import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Invite from "./pages/Invite"; // Make sure this is imported
import Registry from "./pages/Registry";
import Gallery from "./pages/Gallery";
import Venue from "./pages/Venue";
import About from "./pages/About";
import Responses from "./pages/Responses";
import { InviteProvider } from "./context/InviteContext";

const groomName = import.meta.env.VITE_NAME_GROOM;
const brideName = import.meta.env.VITE_NAME_BRIDE;

function App() {
  return (
    <InviteProvider>
      <Router>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/invite/:inviteId?" element={<Invite />} />
            <Route path="/:inviteId?" element={<Home />} />
            <Route path="/registry" element={<Registry />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/about" element={<About />} />
            <Route path="/rsvplist" element={<Responses />} />
          </Routes>
        </div>
        {/*<footer className="text-center py-4 text-gray-500 text-sm">*/}
        <footer className="text-center py-4 text-gray-500 text-sm">
          © 2025 {groomName} & {brideName}
        </footer>
      </Router>
    </InviteProvider>
  );
}
export default App;
