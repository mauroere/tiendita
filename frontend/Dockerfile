# Usa una imagen base de Node.js para construir la aplicación
FROM node:16 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del frontend al contenedor
COPY package*.json ./
COPY . .

# Instala las dependencias y construye la aplicación
RUN npm install
RUN npm run build

# Usa una imagen base de Nginx para servir la aplicación
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
