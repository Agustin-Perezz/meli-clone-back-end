# Meli-Clone-Api.

El desarrollo del back tiene como finalidad consumir y filtrar los datos de la [API]() oficial de Mercado Libre y servirlos para su posterior consumo.
 
Link Deploy (Heroku): https://shrouded-caverns-76126.herokuapp.com/

## Instalación

1. Clonar el proyecto.
2. Instalar las dependencias ejecutando el comando `npm install`.
3. Crear una archivo `.env` con las siguientes variables: 
 - `BASE_URL=https://api.mercadolibre.com`
 - `PORT=3080`
6. Levantar la API con `npm start`.
    ## API Reference

#### Get all items

```http
  POST /api/items/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `product` | `string` | **Required** |

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `filters: { "key": "example", "id_filter": "example" }` | `string` | **Opcional** |


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `sort` | `string` | **Opcional** |

#### Get item

```http
  GET /api/items/${id_item}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_item`      | `string` | **Required**. Id of item to fetch |

## Construido con

* [Node JS](https://nodejs.org/es/)
* [Express](https://expressjs.com/) 

## Autor

Agustin Nicolas Perez - [Linkedin](https://www.linkedin.com/in/agustinperez-front-end-developer/).

