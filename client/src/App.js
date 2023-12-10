import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import PetPage from "./pages/pet/Page/PagePet";
import CreatePetPage from "./pages/pet/CreatePage/CreatePagePet";
import DetailPetPage from "./pages/pet/DetailPage/DetailPagePet";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PetPage />} />
          <Route path="/pets" element={<PetPage />} />
          <Route path="/pets/addPet" element={<CreatePetPage />} />
          <Route path="/pets/detailPet/:idPet" element={<DetailPetPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
