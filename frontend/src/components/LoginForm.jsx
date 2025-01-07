// LoginForm Component
import React from "react";
import { Link } from 'react-router-dom';
import FormField from "./formField";

//pour les variable reactifs
import { useState } from "react";

import { useNavigate } from "react-router-dom";


import { loginUser } from '../services/authService';


// Pour les notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//---------------------------------import fin-------------------------------

const LoginForm = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //une fonction asyncrone pour faire la requete de connexion
  const handleSubmit = async (e) => {
    e.preventDefault();
    try
    {
       const { user, token } = await loginUser(email, password);

       console.log('les info de connexion User:', user , 'Token:', token);

       // Afficher une notification de succès
      toast.success("Connexion réussie !");
      // Si la connexion est réussie, rediriger l'utilisateur vers la page d'accueil
      navigate('/');
    }
  catch (error) { 
    toast.error("Échec de la connexion veuillez reverifier les identifiant de connexion");
    // Si la connexion échoue, afficher un message d'erreur
    console.log("erreur catch lors de la connecter"+error.message);
  }
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Connexion</h2>


      {/* Composant champ de texte que jai créé pour plus de reutilisabilité */}

        <FormField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entrez votre email"
        />
        
        <FormField
          label="Mot de Passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Entrez votre mot de passe"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Connexion
        </button>

        <p className="mt-4 text-center text-gray-600">
          {/* pour les navigation statique je vais utiliser le composant Link */}
          Vous n'avez pas de compte ? <Link to="/register" className="text-blue-500 hover:underline">S'inscrire</Link>
        </p>

      </form>

      <ToastContainer />

    </div>
  );
};

export default LoginForm;