import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';
const API_URL_IA = 'http://localhost:5000/api/tasks/ai';


// const API_URL = 'http://backend:5000/api/tasks';
// const API_URL_IA = 'http://backend:5000/api/tasks/ai';


// Fonction pour récupérer les tâches
export const fetchTasks = async () => {
   const token= localStorage.getItem('token');
   if(!token)
   {
       throw Error("Vous devez vous connecter pour accéder à cette ressource");
   }
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches', error.response?.data || error.message);
    throw error;
  }
};

// Fonction pour ajouter une tâche via l'IA 
export const addTaskWithIA = async (message) => {
  const token= localStorage.getItem('token');
  try {
    const response = await axios.post(
      API_URL_IA,
      { message:message },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ajoute le token dans les headers
        },
      }
    );
    console.log("tache ajouté avec lia avec succes :",response.data);
    return response.data; // Retourne la tâche créée ou autre réponse pertinente
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la tâche via l\'IA', error.response?.data || error.message);
    throw error;
  }
};

// Fonction pour supprimer une tâche
export const deleteTask = async (id) => {
  try {

      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data; // Optionnel : Retourner la réponse de l'API si nécessaire
   
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche', error.response?.data || error.message);
    throw error;
  }
};


// Fonction pour mettre à jour une tâche
export const editTask = async (taskId, updatedTaskData) => {
   const token = localStorage.getItem('token');
   if (!token) {
       throw Error("Vous devez vous connecter pour accéder à cette ressource");
   }
   try {
     const response = await axios.patch(`${API_URL}/${taskId}`, updatedTaskData, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
      
     });
     return response.data;
   } catch (error) {
     console.error('Erreur lors de la mise à jour de la tâche', error.response?.data || error.message);
     throw error;
   }
};


// Fonction pour ajouter une tâche
export const addTask = async (taskData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Vous devez vous connecter pour accéder à cette ressource");
  }
  try {
    const response = await axios.post(API_URL, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche", error.response?.data || error.message);
    throw error;
  }
};

