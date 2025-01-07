import * as taskService from "../services/taskService.js";

// Récupérer toutes les tâches
export async function getAllTasks(req, res) {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Récupérer une tâche par ID
export async function getTaskById(req, res) {
    try {
        const task = await taskService.getTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Tâche non trouvée" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Ajouter une nouvelle tâche
export async function addTask(req, res) {

    const userId = req.user.id; // Récupérer l'ID de l'utilisateur connecté
    
    req.body.userId = userId; // Ajouter l'ID de l'utilisateur connecté dans le corps de la requête

    try {
        const task = await taskService.addTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Mettre à jour une tâche par ID
export async function updateTask(req, res) {
    try {
        const task = await taskService.updateTask(req.params.id, req.body);
        if (!task) {
            return res.status(404).json({ message: "Tâche non trouvée" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Supprimer une tâche par ID
export async function deleteTaskById(req, res) {
    try {
        const task = await taskService.deleteTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Tâche non trouvée" });
        }
        res.status(200).json({ message: "Tâche supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error });
    }
}
