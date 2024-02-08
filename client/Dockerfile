# Dockerfile para el cliente

# Usa una imagen de Node.js LTS como base para el cliente
FROM node:14

# Establece el directorio de trabajo en la carpeta del cliente
WORKDIR /app

# Copia los archivos de la aplicación del cliente al contenedor
COPY . .

# Instala las dependencias del cliente
RUN npm install

# Construye la aplicación de producción del cliente
RUN npm run build

# Exponer el puerto del cliente si es necesario (puedes omitir esto si el cliente se sirve a través del servidor)
EXPOSE 3000

# Comando para iniciar el cliente (puedes modificarlo según tus necesidades)
CMD ["npm", "start"]
