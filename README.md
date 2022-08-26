
# Meli Clone Back-End.

DEPLOY: https://shrouded-caverns-76126.herokuapp.com/


Descripción.
  
El back consume la [api](https://developers.mercadolibre.com.ar/es_ar/api-docs-es) de mercado-libre para hacer el fetch de datos, aplicar filtros y orden de los productos.
 
Tecnologías implementadas: Express, Node-JS.



## Feedback

Cualquier review en cuanto a la performance de la página será apreciada, contactame en: [linkedin](https://www.linkedin.com/in/agustinperez-front-end-developer/).


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



