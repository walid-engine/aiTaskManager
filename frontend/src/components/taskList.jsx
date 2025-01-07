import { useState } from "react";
import Task from "./task";
import { useNavigate } from "react-router-dom";

//prend la liste des tache recuperé depuis sidebar en props je lai mis dans sidebar parce 
//que je veux raffraichir la liste des taches a chaque fois que je supprime une tache
function TaskList({ filteredTasks, refreshTasks }) {

    
    const [search, setSearch] = useState(""); 

    const navigate = useNavigate();

    return (
        <div>
            
            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-blue-900 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Titre</th>
                        <th className="py-3 px-4 text-left">Description</th>
                        <th className="py-3 px-4 text-left">Date d'échéance</th>
                        <th className="py-3 px-4 text-left">Priorité</th>
                        <th className="py-3 px-4 text-left">Statut</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Boucle sur les tâches filtrées et reverse pour afficher les tâches les plus récentes en premier */}
                    {filteredTasks.map(task => (
                        <Task key={task._id} task={task} refreshTasks={refreshTasks}/> // Utilise le composant Task pour chaque tâche
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;