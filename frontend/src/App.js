import './App.css';

import {Routes,Route} from 'react-router-dom'

import LoginPage from './pages/loginPage';
import MainPage from './pages/mainPage';
import RegisterPage from './pages/registerPage';

import { ToastContainer } from 'react-toastify';

//le composant qui verifie les routes
import ProtectedRoute from './components/protectedRoute'; // Import du composant

//le composant racine chargé sur l'index en premier qui contient les different routes
function App() {
  return (
   
      <Routes>
        <Route path="/" element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          } 
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
 
  );
}

export default App;
