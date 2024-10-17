# Utiliser une image officielle de Node.js
FROM node:lts-alpine AS dev

# Définir le répertoire de travail dans le container
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le conteneur
COPY *.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY src src

EXPOSE 4000

# Lancer l'application avec nodemon
CMD ["npm", "run", "dev"]