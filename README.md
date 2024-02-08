### ShareMarine

mern app
reactjs + nodejs + jwt + mongodb

Instalar dependencias del server:

```

npm install

```

Correr el server:

```

npm start

```

Instalar dependencias del cliente:

```

cd client

npm install

```

Correr cliente:

```

cd client

npm start

```

Setear variables de entorno!


Popular db con data mock: 

```

node populate

```

## Correr Local con DOCKER

Crear imagenes client y server

```
docker-compose build

```


Levantar servicios:

```
docker-compose up

```


Bajar servicios:

```
docker-compose down

```


Eliminar imagenes y reconstruir:


```

docker-compose down
docker-compose build
docker-compose up

```


Reniciar server

```

docker-compose restart server

```


** El archivos docker-compose.yml indica los puertos tanto para el cliente como para el servidor.

En local, para la comunicacion entre front y back, en el package.json del cliente, se debe reemplazar "localhost" por el nombre del servicio del servidor. En este docker-compose.yml el nombre del servicio del servidor esta definido como "server". Ej: "proxy": "http://server:3001"