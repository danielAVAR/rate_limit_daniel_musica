# 🎵 API de Música · express-rate-limit + Middlewares

Ejercicio de Campuslands: API REST en Node.js (ESM) con Express, datos en memoria y limitación de tasa.

## Instalación y ejecución

```bash
npm install
npm run dev   
npm test       
```

## Pruebas con cURL

```bash
# Listar canciones (muestra tokens_restantes)
curl -i http://localhost:3000/api/canciones

# Crear una canción (201)
curl -X POST http://localhost:3000/api/canciones \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Despacito","artista":"Luis Fonsi","genero":"Reggaetón","album":"Vida","anio":2017,"duracion":229}'

# Actualizar la canción 1 (200)
curl -X PUT http://localhost:3000/api/canciones/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Bohemian Rhapsody","artista":"Queen","genero":"Rock","album":"A Night at the Opera","anio":1975,"duracion":354}'

# Eliminar la canción 3 (200)
curl -X DELETE http://localhost:3000/api/canciones/3

# Ráfaga de 6 peticiones: la 6.ª responde 429 Too Many Requests
for i in {1..6}; do echo "--- Petición #$i ---"; curl -i http://localhost:3000/api/canciones; done
```

## Estructura

```
campuslands-express-ratelimit-musica/
├── package.json
├── README.md
├── test/
│   └── test-api.js
└── src/
    ├── app.js
    ├── data/
    │   └── canciones.db.js        # arreglo en memoria con canciones semilla
    ├── middlewares/
    │   ├── rateLimiter.js         # apiLimiter (5/min) y crearCancionLimiter (3 POST/min)
    │   ├── logger.js
    │   ├── validator.js           # valida titulo, artista, genero, album, anio, duracion
    │   └── errorHandler.js
    └── routes/
        └── canciones.routes.js    # CRUD: GET, POST, PUT, DELETE
```
