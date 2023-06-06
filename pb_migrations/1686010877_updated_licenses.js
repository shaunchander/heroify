migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7rfryznjcq8dtva")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ynkgpr90",
    "name": "license",
    "type": "text",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("7rfryznjcq8dtva")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
