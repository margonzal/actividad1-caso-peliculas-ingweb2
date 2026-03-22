import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import NavbarPeliculas from "./components/NavbarPeliculas";

import Genero from "./pages/Genero";
import Director from "./pages/Director";
import Productora from "./pages/Productora";
import Tipo from "./pages/Tipo";
import Media from "./pages/Media";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>

      <NavbarPeliculas />

      <Routes>

        <Route path="/media" element={<Media />} />
        <Route path="/genero" element={<Genero />} />
        <Route path="/director" element={<Director />} />
        <Route path="/productora" element={<Productora />} />
        <Route path="/tipo" element={<Tipo />} />
        <Route path="/home" element={<Home />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;