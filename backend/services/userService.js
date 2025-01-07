//import bcrypt from "bcrypt";
//const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';
import UserModel from "../models/userModel.js";

// Hacher un mot de passe
export async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error("Erreur lors du hachage du mot de passe");
    }
}

// Vérifier un mot de passe vue : que le mot de passe est haché dans la bd et celui de luser(candiate) non haché on ne peut pas les comparer directement donc on utilise bcrypt
export async function verifyPassword(candidatePassword, hashedPassword) {
    try {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    } catch (error) {
        throw new Error("Erreur lors de la vérification du mot de passe");
    }
}

// Créer un utilisateur
export async function createUser(userData) {
    try {
        // Hacher le mot de passe avant de sauvegarder
        userData.password = await hashPassword(userData.password);

        const newUser = new UserModel(userData);
        return await newUser.save();
        
    } catch (error) {
        throw new Error("Erreur lors de la création de l'utilisateur");
    }
}

// Authentifier un utilisateur
export async function authenticateUser(email, candidatePassword) {
    try {
        // Rechercher l'utilisateur par email
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error("Utilisateur introuvable");
        }

        // Vérifier le mot de passe
        const isMatch = await verifyPassword(candidatePassword, user.password);
        if (!isMatch) {
            throw new Error("Mot de passe incorrect");
        }

        return user;
    } catch (error) {
        throw new Error(`Erreur d'authentification: ${error.message}`);
    }
}
