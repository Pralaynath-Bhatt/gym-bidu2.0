// import ResponsiveAppBar from "./myComponents/ResponsiveAppBar.js"
import Home from './myComponents/Home.js'
import MyWorkout from "./myComponents/MyWorkout.js";
import Plans from "./myComponents/Plans.js";
import NoPage from "./myComponents/NoPage.js";
import Layout from './myComponents/Layout.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="myworkout" element={<MyWorkout />} />
          <Route path="plans" element={<Plans />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
