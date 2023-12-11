import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import PetPage from './pages/pet/Page/PagePet';
import CreatePetPage from './pages/pet/CreatePage/CreatePagePet';
import DetailPetPage from './pages/pet/DetailPage/DetailPagePet';
import RegisterUserPage from './pages/user/Page/PageUser';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? element : null;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<RegisterUserPage />} />
            <Route
              path="/pets"
              element={
                <ProtectedRoute element={<PetPage />} />
              }
            />
            <Route
              path="/pets/addPet"
              element={
                <ProtectedRoute element={<CreatePetPage />} />
              }
            />
            <Route
              path="/pets/detailPet/:idPet"
              element={
                <ProtectedRoute element={<DetailPetPage />} />
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
