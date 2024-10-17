# Étape de build
FROM node:lts-alpine AS dev

# Créer le répertoire de travail dans le container
WORKDIR /app

# Copier le package.json et le package-lock.json
COPY package*.json ./

# Installer les dépendances en mode développement
RUN npm install

# Copier tout le contenu du projet (sauf les fichiers ignorés par le .dockerignore)
COPY . .

# Exposer le port sur lequel l'application sera lancée (par défaut React utilise le port 3000)
EXPOSE 5173

# Commande pour démarrer le mode développement avec watcher
CMD ["npm", "run", "dev"]