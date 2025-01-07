import React from 'react';
import { Navigate } from 'react-router-dom';

// Composant ProtectedRoute pour prendre les composant enfant et les rediriger vers la page de connexion si l'utilisateur n'est pas connecté
const ProtectedRoute = ({ children }) => {
  // Vérifie si un token est présent dans le localStorage
  const token = localStorage.getItem('token');

  // Si le token n'existe pas, redirige vers la page de connexion
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si le token est valide, rend le composant enfant
  return children;
};

export default ProtectedRoute;
