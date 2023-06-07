migrate((db) => {
  const collection = new Collection({
    "id": "g4lqzyz3gmymelv",
    "created": "2023-06-07 06:46:18.145Z",
    "updated": "2023-06-07 06:46:18.145Z",
    "name": "prompts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "esduhs1q",
        "name": "license",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "7rfryznjcq8dtva",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "license"
          ]
        }
      },
      {
        "system": false,
        "id": "wqksstsp",
        "name": "prompt",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "1m017hed",
        "name": "images",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("g4lqzyz3gmymelv");

  return dao.deleteCollection(collection);
})
