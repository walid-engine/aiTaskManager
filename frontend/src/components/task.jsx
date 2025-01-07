
import { useNavigate } from 'react-router-dom';

import { useState } from "react";

import {deleteTask,editTask } from '../services/taskServices';

import EditTaskModal from "./editTaskModal";

// Notification et confirmation dialog
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Swal from 'sweetalert2';

//prend lobjet tache et la fonction pour metre a jour apres suppression
function Task({ task , refreshTasks }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

        //mes deux fonctions pour ouvrir et fermer le modal
    const handleOpenModal = () => setIsModalOpen(true);
    //pour fermer je le passe dans la fonction modal comme props onClose et je le passe dans le bouton close
    const handleCloseModal = () => setIsModalOpen(false);

    // Fonction pour confirmer la suppression avec des notif
    const confirmDelete = (taskId) => {
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Vous ne pourrez pas annuler cette action !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer !',
            cancelButtonText: 'Annuler',
        }).then((result) => {
        if (result.isConfirmed) {
            deleteTask(taskId);
            Swal.fire({
            title: "supprimé!",
            text: "La tache a été supprimé",
            icon: "success"
            });

            refreshTasks(); // Rafraîchir la liste des tâches
            
            toast.success("Tâche supprimée avec succès !");
        } else {
            toast.info("Suppression annulée.");
        }
    });
  };


  const completeTask = async(task) => {
    
    // Construire l'objet à envoyer avec les meme donné et le statut changé a completed
    const taskData = {
      "title": task.title,
      "description": task.description,
      "dueDate": task.dueDate,
      "priority": task.priority,
      "status": "completed",
    };
  
    try {
      // Appeler la fonction de modification avec le nouveau statut
      await editTask(task._id, taskData);
  
      // Afficher une notification de succès
      toast.success("Tâche complété avec succès !");
  
      await refreshTasks();// j'Appele la fonction pour rafraîchir la liste des tâches
  
    } catch (error) {
      // Gérer les erreurs et afficher une notification d'échec
      console.error("Erreur lors de la mise a jour de la tâche :", error.response?.data || error.message);
      toast.error("Une erreur s'est produite lors de la mise a jour de la tâche.",error.response?.data || error.message);
    }
  
  };

   // Fonction pour confirmer la completion de tache
  const confirmDComplete = (task) => {
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Vous avez acompli la tache !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, tache acompli !',
            cancelButtonText: 'Annuler',
        }).then( async(result) => {
        if (result.isConfirmed) {

            await completeTask(task);
            
            Swal.fire({
            title: "acompli!",
            text: "La tache a été acompli",
            icon: "success"
            });

        } else {
            toast.info("acomplissement annulée.");
        }
    });
  };

    const navigate = useNavigate();

    return (

        <>

        {/* ------------------------------Modal debut-----------------------*/}
        {/* jappelle mon modal ici avec les props la tache en question y compris*/}

            <EditTaskModal 
            isOpen={isModalOpen} 
            onClose={handleCloseModal}
            onTaskAdded={refreshTasks} // je passe la fonction de mise à jour a la form de tel sorte que lors d'un ajou je lappel
            task={task} // je passe l'id de la tache a modifier
            >

            </EditTaskModal>

        {/* ----------------------------Modal fin-----------------------------*/}

        <tr className="hover:bg-blue-100 transition duration-300">
            <td className="py-3 px-4 border-b">{task.title}</td>
            <td className="py-3 px-4 border-b">{task.description}</td>
            <td className="py-3 px-4 border-b">{task.dueDate}</td>
            <td className="py-3 px-4 border-b">{task.priority}</td>
            <td className="py-3 px-4 border-b">{task.status}</td>
            <td className="py-3 px-4 border-b">
                <button className="deletebtn bg-red-500 text-white mx-2 my-1 px-3 py-1 rounded hover:bg-red-600 transition duration-200 ml-2" onClick={() => confirmDelete(task._id)}> <span className="material-icons">delete</span> </button>
                <button className=" bg-blue-500 text-white mx-2 my-1 px-3 py-1 rounded hover:bg-blue-600 transition duration-200"  onClick={handleOpenModal}> <span className="material-icons">edit</span> </button>
                <button className=" bg-green-500 text-white mx-2 my-1 px-3 py-1 rounded hover:bg-green-600 transition duration-200" onClick={() => confirmDComplete(task)}> <span className="material-icons">check</span> </button>
            </td>
        </tr>

        </>
    );
}

export default Task;