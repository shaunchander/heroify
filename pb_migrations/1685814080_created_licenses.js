migrate((db) => {
  const collection = new Collection({
    "id": "7rfryznjcq8dtva",
    "created": "2023-06-03 17:41:20.028Z",
    "updated": "2023-06-03 17:41:20.028Z",
    "name": "licenses",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ynkgpr90",
        "name": "license",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("7rfryznjcq8dtva");

  return dao.deleteCollection(collection);
})
