import { extractTaskData } from "./services/aiService.js";

const testMessage = "ajouter une tâche : acheter des pommes à 17h demain, priorité élevée";

const testExtraction = async () => {
    try {
        let extractedData = await extractTaskData(testMessage);
        console.log("Données extraites : ", extractedData);
    } catch (error) {
        console.error("Erreur lors de l'extraction des données : ", error);
    }
};

testExtraction();