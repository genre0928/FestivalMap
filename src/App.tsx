import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Header from "./Routes/Header";
import Region from "./Routes/Region";
import Month from "./Routes/Month";
import Upcoming from "./Routes/Upcoming";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/upcoming" element={<Upcoming />}></Route>
        <Route path="/month" element={<Month />}></Route>
        <Route path="/region" element={<Region />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
