// RegisterForm Component
import React from "react";
//pour les navigation static simple sans logique
import { Link } from 'react-router-dom';

//pour les variable reactifs
import { useState } from "react";

//pour les navigation dynamique
import { useNavigate } from "react-router-dom";

import { registerUser } from '../services/authService';

//---------------------------------import fin-------------------------------

const RegisterForm = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    try
    {
      const { user } = await registerUser(email, password,userName);
      console.log('Utilisateur créé avec succès :', user);
      navigate('/login');
    }catch (error) { 
      console.log("erreur catch lors de la connexion"+error.message); 
    }

  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-6 rounded shadow">
      
      <h2 className="text-2xl font-bold mb-4">Créer un compte</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Nom d'utilisateur</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Entrez votre nom d'utilisateur"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Entrez votre email"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Entrez votre mot de passe"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Répétez le mot de passe</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Confirmez votre mot de passe"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        S'inscrire
      </button>

      <p className="mt-4 text-center text-gray-600">
        Vous avez déjà un compte ? <Link to="/login" className="text-blue-500 hover:underline">Se Connecter</Link>
      </p>

    </form>
  );
};

export default RegisterForm;