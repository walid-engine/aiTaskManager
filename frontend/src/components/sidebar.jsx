import React from "react";
import { useState ,useEffect} from "react";

import AddTaskModal from "./addTaskModal";

import { logoutUser } from '../services/authService';

import { useNavigate , Link} from "react-router-dom";

import TaskList from './taskList'; 

//fonction pour add du service front
import { addTaskWithIA } from "../services/taskServices";

// Pour les notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Swal from 'sweetalert2';

import { fetchTasks } from '../services/taskServices';

//-----------------------------fin import--------------------------------

const SideBar = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const [chatInput, setChatInput] = useState(""); // Pour suivre l'entrée utilisateur
    const [chatMessages, setChatMessages] = useState([]); // Historique des messages

    const [tasks, setTasks] = useState([]);

    const [search, setSearch] = useState(""); 


    //-----------------------var fin-----------------------------

    // Charge les tâches au montage du composant
    const loadTasks = async () => {
      try {
        const tasksData = await fetchTasks();
        setTasks(tasksData);
        console.log("Tâches récupérées avec succès :", tasksData);
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches :", error);
      }
    };

    //je vais envoyer en param les tache filtré deja en fonction de la valeur dans le form de recherche qui es une var detat
    const filteredTasks = tasks.filter(
    (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
      console.log("entré dans le user effect")
      loadTasks();
    }, []);


    //mes deux fonctions pour ouvrir et fermer le modal
    const handleOpenModal = () => setIsModalOpen(true);
    //pour fermer je le passe dans la fonction modal comme props onClose et je le passe dans le bouton close
    const handleCloseModal = () => setIsModalOpen(false);

    //soumettre le formulaire d'ajout
    const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulaire soumis !");
    setIsModalOpen(false);
    };

      //une fonction asyncrone pour faire la requete de connexion
      const handleLogOut = async (e) => {
        e.preventDefault();
        // Afficher une boîte de dialogue de confirmation avec SweetAlert2
        Swal.fire({
          title: 'Êtes-vous sûr ?',
          text: "Vous ne pourrez pas annuler cette action !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, me déconnecter !',
          cancelButtonText: 'Annuler',
        }).then(async (result) => {
          if (result.isConfirmed) {

            try {
              await logoutUser(); // Appeler la fonction de déconnexion
              navigate('/login', { replace: true }); // Rediriger vers la page de connexion
              toast.success("Vous êtes déconnecté !"); // Afficher une notification de succès
            } catch (error) {
              console.log("Erreur catch lors de la déconnexion : " + error.message);
              toast.error("Une erreur s'est produite lors de la déconnexion"); // Afficher une notification d'erreur
            }
          } 
          
          else {
            toast.info("Déconnexion annulée."); // Afficher une notification d'information
          }
        });

      };


      //variable statique pour le sidebar
  const [isOpen, setIsOpen] = useState(true);

  //fermer ouvrir la sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  // Gestion des messages du chatbot envoie ajout dans la liste de message
  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    try {

      const response = await addTaskWithIA(chatInput); // Utilisez la fonction pour envoyer le message à l'IA

      setChatMessages([...chatMessages, chatInput]); // Ajoute le message au tableau
      setChatInput(""); // Réinitialise le champ d'entrée
      toast.success("Tache ajouté avec succes !");

      // Rafraîchit la liste des tâches
      await loadTasks();

    } catch (error) {
      console.error("Erreur lors de l'envoi du message : ", error.message);
      alert("Une erreur s'est produite lors de la communication avec le chatbot.");

      toast.error("Une erreur s'est produite lors de la communication avec le chatbot.");
    }
  };



  const showHelpModal = () => {
  Swal.fire({
    title: 'Aide',
    html:
      "<p>Bienvenue dans l'aide ! Voici quelques instructions :</p>" +
      "<ul>" +
      "<li>Pour ajouter une tâche, cliquez sur le bouton 'Ajouter une tâche' ou envoyez le message a lassistant exemple : ajoute moi la tache....</li>" +
      "<li>Pour rechercher une tâche, utilisez le champ de recherche.</li>" +
      "<li>Pour supprimer une tâche, utilisez le bouton supprimer ou demander a lassistant exemple : supprime la tache 1 ou 2 ou 3 </li>" +
      "<li>Pour modifier une tache, demander a l'assistant : exemple modifie la tache 1 et met aller au ciné demain soir '.</li>" +
      "<li>Pour vous déconnecter, cliquez sur le bouton 'Déconnexion'.</li>" +
      "</ul>" +
      "<p>Pour plus d'informations, contactez nous.</p>",
    icon: 'info',
    confirmButtonText: 'OK',
    confirmButtonColor: '#3085d6',
    customClass: {
      popup: 'swal2-popup-custom', // Classe pour la boîte de dialogue
      htmlContainer: 'swal2-html-container-custom', // Classe pour le contenu HTML
    },
    didOpen: () => {
      // Appliquez le style inline après l'ouverture de la boîte de dialogue
      const popup = Swal.getPopup();
      const htmlContainer = Swal.getHtmlContainer();
      if (popup && htmlContainer) {
        popup.style.maxHeight = '80vh';
        popup.style.overflowY = 'auto';
        htmlContainer.style.maxHeight = '60vh';
        htmlContainer.style.overflowY = 'auto';
      }
    },
  });
};


  return (
    
    <div className="flex h-screen">


        {/* ------------------------------Modal debut-----------------------*/}
        {/* jappelle mon modal ici avec les props*/}

            <AddTaskModal 
            isOpen={isModalOpen} 
            onClose={handleCloseModal}
            onTaskAdded={loadTasks} // je passe la fonction de mise à jour a la form de tel sorte que lors d'un ajou je lappel
            >

            </AddTaskModal>

        {/* ----------------------------Modal fin-----------------------------*/}

    
        <div
            className={`${
            isOpen ? "w-64" : "w-16"
            } bg-gray-800 text-white transition-all duration-500`}
        >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
            <h1
                className={`${
                isOpen ? "text-xl" : "hidden"
                } font-bold tracking-wide`}
            >
            ✅EazyTask✅
            </h1>
            <button
                onClick={toggleSidebar}
                className="text-gray-300 hover:text-white"
            ><span className="material-icons"> {isOpen ?"close" : "menu"} </span>
            </button>
        </div>

      
        <nav className="mt-4">
          <ul className="space-y-4">
            <li className="px-4 py-4 mx-1 hover:bg-gray-700 rounded">
                <Link to="/" className="flex items-center">
                    <span className="material-icons">dashboard</span>
                    <span className={`${isOpen ? "ml-3" : "hidden"}`}>Tableau de bord</span>
                </Link>
            </li>
           
            <li className="px-4 py-4 mx-1 hover:bg-gray-700 rounded">
              <a href="#help" onClick={(e) => {showHelpModal();}} className="flex items-center">
                <span className="material-icons">help</span>
                <span className={`${isOpen ? "ml-3" : "hidden"}`}>Aide</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

  {/* Main Content */}
<div className="flex-1 bg-gray-100 p-6 overflow-hidden"> {/* Utilise overflow-hidden pour éviter le défilement de la page principale */}
    <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold my-2">Tableau de bord</h2>
        <button onClick={handleLogOut} className="ml-3 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Deconnexion
        </button>
    </div>

    <div className="flex mb-4" justify-between items-center>
        <input
            type="text"
            placeholder="Rechercher une tâche"
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-bg-800 shadow-sm hover:shadow-lg transition duration-200"
        />
        <button onClick={handleOpenModal} className="ml-3 px-6 py-2 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Ajouter une tâche
        </button>

        <button className="ml-3 px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          <span className="material-icons">tune</span>
        </button>
    </div>

    <div className="flex gap-3 mt-4 h-[calc(100vh-180px)]"> {/* Ajuste la hauteur pour éviter le débordement */}
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-lg overflow-y-auto"> {/* Enlève h-full pour permettre le défilement interne */}
            <h3 className="text-xl font-semibold mb-4">Liste des tâches</h3>

            {/* je vais passer la fonction pour reload a tasklist pour ensuite le transferer a task pour reload lors d'une suppression */}
            <TaskList filteredTasks={filteredTasks} refreshTasks={loadTasks}/> {/* j'Injecte le composant TaskList */}
        </div>

        <div className="w-1/3 bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Assistant</h3>
            <div className="flex flex-col h-96 border border-gray-300 p-3 rounded-lg mb-4">
                
            <div className="flex">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="ex: ajoute-moi la tâche aller visiter..."
                  rows={2} // Définit le nombre de lignes visibles
                  className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 resize-y"
                />
                <button onClick={handleSendMessage} className="ml-3 px-4 py-2 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg">
                    Envoyer
                </button>
            </div>

            <div className="flex flex-col h-full overflow-y-auto border border-gray-300 p-3 rounded-lg mb-4 mt-4">
                {/* Affichage des messages */}
                {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className="p-2 bg-blue-100 rounded-lg my-1 self-end max-w-xs"
                >
                  {message}
                </div>
              ))}
            </div>
        </div>
    </div>
  </div>
</div>

<ToastContainer />

</div>

  );
  
};

export default SideBar;
