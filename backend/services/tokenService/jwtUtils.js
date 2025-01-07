import jwt from "jsonwebtoken";

// Générer un token
export function generateToken(payload) {
    //jai mis lid et le mail dans le payload pour les avoir dans le req.user
    //prochaine etape le token vas sexpirer : { expiresIn: process.env.JWT_EXPIRES_IN }
    return jwt.sign(payload, process.env.JWT_SECRET);
}

// Vérifier la validité et expiration du token
export function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error("Token invalide ou expiré");
    }
}
