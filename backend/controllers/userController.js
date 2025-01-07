import { createUser, authenticateUser } from "../services/userService.js";

//importer la fonction generateToken du fichier jwtUtils.js dans les service
import { generateToken } from "../services/tokenService/jwtUtils.js";

export async function registerUser(req, res) {
    try {
        
        console.log(req.body);
      
        const user = await createUser(req.body);
        res.status(201).json({ message: "Utilisateur créé avec succès", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function loginUser(req, res) {
    try {
        // ah ca cest nouveau : c'est une syntaxe d'affectation appelée destructuration (ou destructuring) en JavaScript. Elle permet d'extraire des valeurs spécifiques d'un objet ou d'un tableau et de les affecter directement à des variables qui on les meme nom que les clé .
        const { email, password } = req.body;

        console.log(req.body);

        // Vérification des champs
        if (!email || !password) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }else{
            
            const user = await authenticateUser(email, password);

            //generer le token de luser en passant dans le paiload l'id et l'email que je pourait avoir bnesoin apres donc il seront stocké dans req.user
            const token = generateToken({ id: user.id, email: user.email });

            res.status(200).json({ message: "Connexion réussie", user ,"token": token });
        }

        
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

