migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g4lqzyz3gmymelv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uvfga0iz",
    "name": "numImages",
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
  const collection = dao.findCollectionByNameOrId("g4lqzyz3gmymelv")

  // remove
  collection.schema.removeField("uvfga0iz")

  return dao.saveCollection(collection)
})
