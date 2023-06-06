migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7rfryznjcq8dtva")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g6pfmjtp",
    "name": "credits",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7rfryznjcq8dtva")

  // remove
  collection.schema.removeField("g6pfmjtp")

  return dao.saveCollection(collection)
})
