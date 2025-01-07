import TaskModel from "../models/taskModel.js";

// Récupérer toutes les tâches
export async function getAllTasks() {
    return await TaskModel.find();
}

// Récupérer une tâche par ID
export async function getTaskById(taskId) {
    return await TaskModel.findById(taskId);
}

// Ajouter une nouvelle tâche
export async function addTask(taskData) {
    //jai trouvé un peu de similitude avec Jpa/Hibernate en java : créé un objet et ensuite le sauvegarder
    const newTask = new TaskModel(taskData);
    return await newTask.save();
}

// Mettre à jour une tâche par ID
export async function updateTask(taskId, updateData) {
    //jajoute new true pour recuperer l'objet modifié au lieu de l'ancien
    return await TaskModel.findByIdAndUpdate(taskId, updateData, { new: true });
}

// Supprimer une tâche par ID
export async function deleteTaskById(taskId) {
    return await TaskModel.findByIdAndDelete(taskId);
}
