# Proyecto NodeJs & FireStore
 
 Proyecto basado en Node para un CRUD basico, este diseño ofrece:
-   ✅ Configuración centralizada    
-   ✅ Validación de datos con Joi    
-   ✅ Manejo profesional de errores    
-   ✅ Seguridad CORS    
-   ✅ Variables de entorno protegidas    
-   ✅ Arquitectura escalable (MVC)

 ## Para ejecutar el proyecto:

1.  Instalar dependencias: 
	```
    npm install firebase@11.5.0 --save
    npm install express cors dotenv firebase joi
    ```
2.  Estructura final del proyecto:   

    ```
    📦 proyecto-firestore
    ├── .env
    ├── index.js
    ├── config/
    │   └── firebase.config.js
    ├── controllers/
    │   └── clientes.controller.js
    ├── models/
    │   └── Cliente.js
    └── routes/
        └── clientes.routes.js
    ```

## Endpoints disponibles:

|Metodo  |  Endpoint | Funcion |
|--|--|--|
| POST | /clientes | Crear cliente |
| GET  | /clientes | Listar clientes |
| PUT  | /clientes/<id> | Actualizar |
| DELETE  | /clientes/<id> | Eliminar |


## Ejemplo de uso con curl:

    # Crear cliente
    curl -X POST -H "Content-Type: application/json" \
    -d '{
      "nombres": "Ana",
      "apellidos": "Torres",
      "email": "ana@example.com",
      "celular": "0991234567"
      }' http://localhost:4000/clientes
    
    # Listar clientes
    curl http://localhost:4000/clientes

## Otros
  