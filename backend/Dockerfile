# backend/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

# Copia solo los archivos de dependencias primero
COPY package*.json ./

# Instala dependencias
RUN npm ci --only=production

# Copia el resto de la aplicación
COPY . .

# Puerto expuesto (ajusta si es necesario)
EXPOSE 3000

CMD ["npm", "start"]