import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import RegisterUserPage from './pages/user/Page/PageUser';

import MoviePage from './pages/movie/Page/PageMovie';
import CreateMoviePage from './pages/movie/CreatePage/CreatePageMovie';
import DetailMoviePage from './pages/movie/DetailPage/DetailPageMovie';
import CreateReviewPage from "./pages/review/CreatePage/CreatePageReview";


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
            <Route path="/movies" element={<ProtectedRoute element={<MoviePage />} />} />
            <Route path="/movies/addMovie" element={<CreateMoviePage />} />
            <Route path="/movies/detailMovie/:idMovie" element={<DetailMoviePage />} />
            <Route path="/movies/:idMovie/addReview" element={<CreateReviewPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
