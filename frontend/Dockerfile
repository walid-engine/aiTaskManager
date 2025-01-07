# Étape 1 : Utiliser une image Node.js comme base pour construire l'application
FROM node:18 AS builder

# Définir le dossier de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Construire l'application React
RUN npm run build

# Étape 2 : Utiliser une image Nginx pour servir l'application construite
FROM nginx:1.23

# Copier les fichiers générés dans le build de React vers Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Exposer le port utilisé par le frontend
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
