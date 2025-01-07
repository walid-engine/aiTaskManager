//const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from 'node-fetch';

const genAI = new GoogleGenerativeAI("AIzaSyDKHTWraYIoaSguHBanvITP8TEzlzLSDsA",{ fetch });
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// je vais passer la date du jour dans le prompt parce que lia na pas la date du jour et en fonction de cette date definir les date si par exemple lutilisateur tape demain ou apres demain
// Obtenir la date actuelle au format 'YYYY-MM-DD' et si mentionne pas une date je met la date du jour
const today = new Date().toISOString().split('T')[0];

export const extractTaskData = async (userMessage,userId) => {
    const prompt = `Please extract the following details from the user's message in pure JSON format, without any other text or markdown formatting. This must be directly injectable into a JavaScript code and precision is crucial:
    1. Title of the task
    2. Description of the task
    3. Due date
    4. Priority (high, medium, low)
    5. UserId = "${userId}"
    6. If the user mentions a relative date (e.g., "demain soir"), convert it to the exact date using "${today}" as the reference.
    7. If none of these operations apply, respond with "${today}".
    
    The response should be **only** the JSON object, with no extra explanation or markdown code blocks, and formatted as a valid JavaScript object like:
    {
        "title": "Title of the task",
        "description": "Generate a description of the task",
        "dueDate": "YYYY-MM-DD",
        "priority": "high"
        "status": "pending"
        "userId": "${userId}"
    }
    User message: "${userMessage}"`;

    // je genere la reponse cest a dire lextraction des données  avec lia il me retourne en json
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // ouf un peu de galere mais jai capté : la reponse de lia donné etait envoyé avec ```json au debut et ``` a la fin donc je remplace tout ca par '' vide et supprime tout ce qui es espace probleme resolu
    const responsecorrect = response.replace(/```json|```/g, '').trim();

    console.log("Réponse de l'IA : ", responsecorrect); // Affiche la réponse pour vérifier

    try {

        //m'assurez-vous que l'IA retourne un JSON bien formaté
        const taskData = JSON.parse(responsecorrect);
        //puis je retourne ca au controller qui va utiliser pour lancer la requete 
        return taskData;

    } catch (error) {
        console.error('Erreur de parsing de la réponse IA:', error);
        return null;
    }
};


export const detectOperationAndDetails = async (userMessage) => {

    const prompt = `Analyze the user's message and determine:
    1. The operation ("ajouter", "modifier", "supprimer").
    2. If the operation is "modifier" or "supprimer", extract the task ID or title mentioned in the message.
    3. If the operation is "modifier", also extract the new details and generate new description from title for the task as:
        {
            "title": "New Title",
            "description": "New Description",
            "dueDate": "YYYY-MM-DD",
            "priority": "high" // or medium, low
        }
    4. If none of these operations apply, respond with "Precisez l'operation que vous voulez effectuer".
    5. If the user mentions a relative date (e.g., "demain soir"), convert it to the exact date using "${today}" as the reference.
    6. If none of these operations apply, respond with "${today}".

    Only return the result as JSON with no additional explanations or text as:
    {
        "operation": "modifier",
        "taskId": "Task ID or Title",
        "newDetails": {
            "title": "New Title",
            "description": "New Description from title",
            "dueDate": "YYYY-MM-DD",
            "priority": "high"
        }
    }

    User message: "${userMessage}"`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const responseCorrect = response.replace(/```json|```/g, '').trim();

    console.log("Réponse de l'IA :", responseCorrect);

    try {
        const operationData = JSON.parse(responseCorrect);
        return operationData;
    } catch (error) {
        console.error('Erreur de parsing de la réponse IA:', error);
        return { operation: "unknown", taskId: null };
    }
};
