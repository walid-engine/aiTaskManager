//ici j'Ajoute un middleware qui vérifie le token avant d'accéder à certaines routes.

import { verifyToken } from "./jwtUtils.js";

export function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token manquant ou invalide" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token reçu par le middleware:", token);

    try {
        const decoded = verifyToken(token);

        console.log("Données décodées:", decoded);  // Log du contenu du token

        req.user = decoded; // Ajoute les infos utilisateur decodé (mail userId que javait encodé dans le token) dans req.user donc jaurai acces a ces données dans les 
        // routes qui utilise ce middleware en dautre terme : ID de l'utilisateur disponible dans toutes les routes protégées.
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Token invalide ou expiré" });
    }
}
