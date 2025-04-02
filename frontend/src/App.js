import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './myComponents/Home.js';
import MyWorkout from "./myComponents/MyWorkout.js";
import Plans from "./myComponents/Plans.js";
import NoPage from "./myComponents/NoPage.js";
import Login from './myComponents/Login.jsx';
import SignUp from './myComponents/SignUp.jsx';
import UserProfile from './myComponents/UserProfile.js';
import ResponsiveAppBar from "./myComponents/ResponsiveAppBar.js"; // Make sure this is properly imported

function App() {
  return (
    <BrowserRouter>
      {/* Navbar stays at the top on all pages */}
      <ResponsiveAppBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myworkout" element={<MyWorkout />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
