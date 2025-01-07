import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// const API_URL= 'http://backend:5000/api/users';

// registerUser pour inscrire un utilisateur et rediriger en cas de succès
export const registerUser = async (email,password,userName) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password,userName });

    // récupérer l'utilisateur créé
    const { user } = response.data;

    // Retourne l'utilisateur inscrit
    return { user };

  } catch (error) {
    console.error('Erreur lors de linscription', error.response?.data || error.message);
    throw error;
  }
};

//loginUser pour effectuer la connexion et rediriger l'utilisateur en cas de succès.
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    // je fait la destructuration pour recuperer le token et l'utilisateur dans la reponse 😎😎😎😎😎
    const { token, user } = response.data;

    // j'Enregistre le token dans le localStorage ou sessionStorage pour une utilisation future
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    //retourne l'utilisateur et le token
    return { user, token };

  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};
