# Utiliser une image Node.js comme base
FROM node:18

# Définir le dossier de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port utilisé par le backend
EXPOSE 9090

# Commande pour lancer l'application pas avec node en production vue que je ne veux pas rafraichir le serveur a chaque fois que je fais un changement
CMD ["node", "index.js"]
