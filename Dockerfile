# Dockerfile para el servidor

# Usa una imagen de Node.js LTS como base para el servidor
FROM node:14

# Establece el directorio de trabajo en la raíz del proyecto
WORKDIR /app

# Copia los archivos del servidor al contenedor
COPY . .

# Instala las dependencias del servidor
RUN npm install

# Exponer el puerto del servidor
EXPOSE 3001

# Comando para iniciar el servidor
CMD ["npm", "start"]
