import React from "react";

//fonction pour add du service front
import { addTask } from "../services/taskServices";

import { useState } from "react";

// Pour les notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//--------------------------------fin import-----------------------------------

const AddTaskModal = ({ isOpen, onClose, onTaskAdded}) => {

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [dueDate, setDueDate] = useState("");
const [priority, setPriority] = useState("medium");
const [status, setStatus] = useState("pending");

// Si le modal n'est pas ouvert, ne rien afficher
if (!isOpen) return null;


const handleSubmit = async(e) => {
  e.preventDefault();
  
  // Construire l'objet à envoyer
  const taskData = {
    title,
    description,
    dueDate,
    priority,
    status,
  };

  try {
    // Appeler la fonction d'ajout
    await addTask(taskData);

    // Afficher une notification de succès
    toast.success("Tâche ajoutée avec succès !");

    await onTaskAdded();// j'Appele la fonction pour rafraîchir la liste des tâches
    // Fermer le modal
    onClose();

  } catch (error) {
    // Gérer les erreurs et afficher une notification d'échec
    console.error("Erreur lors de l'ajout de la tâche :", error.response?.data || error.message);
    toast.error("Une erreur s'est produite lors de l'ajout de la tâche.");
  }

};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg mx-auto p-6 rounded-lg shadow-lg">
        
                <h2 className="text-xl font-bold mb-4">Ajouter une tache</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Titre</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                      placeholder="Entrez le titre"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                      placeholder="Entrez la description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Priorité</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Sélectionnez la priorité"
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option className="focus:outline-none" value="low">Basse</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Haute</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Priorité</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Sélectionnez la priorité"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option className="focus:outline-none" value="pending">En attente</option>
                        <option value="in-progress">en cours</option>
                        <option value="completed">effectué</option>
                    </select>
                  </div>
        
                {/* fermer le modal */}
                  <button
                    onClick={onClose}
                    type="submit"
                    className="mx-2 px-4 py-2 bg-red-400 text-white rounded-lg shadow hover:bg-red-500"
                  >
                    Annuler
                  </button>
        
                {/* soumettre le formulaire */}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-800 text-white rounded-lg shadow hover:bg-blue-700"
                  >
                    Soumettre
                  </button>
                </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddTaskModal;