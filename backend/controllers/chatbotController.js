// const aiService = require('../services/aiService');
// const taskService = require('../services/taskService');

import { detectOperationAndDetails ,extractTaskData } from '../services/aiService.js';
import { getAllTasks ,updateTask,deleteTaskById,addTask} from '../services/taskService.js';

export const handleUserMessage = async (req, res) => {

    const userMessage = req.body.message;

    const userId = req.user.id;  // Récupérer l'ID de l'utilisateur depuis req.user
    // Le middleware authenticateJWT vérifie la validité du token et ajoute les informations
    //  de l'utilisateur dans req.user afin qu'elles soient disponibles dans les routes suivantes
    //  (comme l'ID de l'utilisateur pour les tâches).

    console.log(`id de l'utilisateur ${userId}`);

    //sil es bien present 
    if (userMessage) {

        //jenvoi une requete vite fait au service de lia que jai defini dans service pour quil me donne le type doperation pour pouvoir appeler le bon service ca marche pluto bien cool 
        const operationData = await detectOperationAndDetails(userMessage);

        //la je peut verifier le retour et envoyer la bonne requete
        if (operationData.operation === "ajouter") {

            //si contient ajouter on jenvoie le texte a lia dans service il extrait les infos en format json et me renvoie dans les donné en format json taskData
            const taskData = await extractTaskData(userMessage,userId);

            //si taskData existe cest a dire jai pu extraire les donné proprement je lance la requete d'ajout
            if (taskData) {
                const task = await addTask(taskData);
                res.status(201).json({ message: 'Tâche ajoutée avec succès', task });
            }
            else {
                res.status(400).json({ message: 'Impossible d\'extraire les données de la tâche' });
            }
        }

        //si l'ia retourne modifier
        else if (operationData.operation === "modifier" && operationData.taskId && operationData.newDetails) {
            const tasks = await getAllTasks();

            //pour pas que lutilisateur mette un numero de tache qui nexiste pas j'utilise la position 
            // ou index par exemple dans chaque requete l'ulisateur doit preciser lindex de la tache a 
            // supprimser par exempke supprime la tche2 ou modifie la tache 2
            //donc en realité le taskId retourné par par lia apres traitement represente lindex que luser a mis
            
            const taskIndex = operationData.taskId - 1; // Convertir numéro en index (0-based)

                if (taskIndex >= 0 && taskIndex < tasks.length) {
                    const taskToModify = tasks[taskIndex];

                    const updatedTask = await updateTask(taskToModify._id, operationData.newDetails);

                    if (updatedTask) {
                        return res.status(200).json({
                            message: `Tâche "${updatedTask.title}" mise à jour avec succès.`,
                            task: updatedTask,
                        });
                    } else {
                        return res.status(404).json({ message: "Tâche introuvable pour modification." });
                    }
                } else {
                    return res.status(404).json({ message: "Numéro de tâche invalide." });
                }
            }

        else if (operationData.operation === "supprimer" && operationData.taskId) {
            // Récupérer toutes les tâches
            const tasks = await getAllTasks();
            const taskIndex = operationData.taskId - 1; // Convertir numéro en index (vue que la liste commence par index 0 donc si user met 1 par exemple cest 0)

            if (taskIndex >= 0 && taskIndex < tasks.length) {
                const taskToDelete = tasks[taskIndex];
                await deleteTaskById(taskToDelete._id);
                return res.status(200).json({ message: `Tâche "${taskToDelete.title}" supprimée avec succès.` });
            } else {
                return res.status(404).json({ message: "Numéro de tâche invalide." });
            }
        }

        else {
            res.status(400).json({ message: 'Commande non reconnue' });
        }

    }

};