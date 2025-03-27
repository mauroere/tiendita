# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del backend al contenedor
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto 5000
EXPOSE 5000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
