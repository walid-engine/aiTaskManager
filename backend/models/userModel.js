import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Garantir l'unicité des emails
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Adresse email invalide"], // Validation de format
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Assurez-vous d'avoir un mot de passe sécurisé
    },
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
