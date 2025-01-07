import express from "express";
import { addTask, deleteTaskById, getAllTasks, getTaskById, updateTask } from "../controllers/taskController.js";
import { handleUserMessage } from '../controllers/chatbotController.js'; // Import du contrôleur pour l'extraction

//authentifier le token en utilisant un middleware avant d'acceder au routes des taches
import { authenticateJWT } from "../services/tokenService/routeMidddleware.js";

const router = express.Router();

// Définir les routes pour les tâches et Appliquer le middleware uniquement à ces routes
router.route("/")
    .get(authenticateJWT,getAllTasks)   // Récupérer toutes les tâches
    //.post(addTask);     // Ajouter une nouvelle tâche
    .post(authenticateJWT,addTask); 

router.route("/ai")
    .post(authenticateJWT,handleUserMessage); // Analyser un message utilisateur avec lia et extraire les données de la requete et le type d'operation a faire

router.route("/:id")
    .get(getTaskById)    // Obtenir une tâche spécifique par son ID
    .delete(deleteTaskById) // Supprimer une tâche par son ID
    .patch(updateTask);  // Modifier une tâche existante par son ID
    

export default router;
