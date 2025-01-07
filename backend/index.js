import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import taskRoutes from "./routes/taskRoutes.js"; // j'importe les routes des tâches
import userRoutes from "./routes/userRoutes.js"; // j'importe les routes des users

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);


// Connexion à MongoDB et démarrage du serveur
mongoose.connect(process.env.DB_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
