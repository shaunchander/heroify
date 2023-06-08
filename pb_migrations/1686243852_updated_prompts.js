migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g4lqzyz3gmymelv")

  // remove
  collection.schema.removeField("esduhs1q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fpyamdtc",
    "name": "license",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g4lqzyz3gmymelv")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("fpyamdtc")

  return dao.saveCollection(collection)
})
