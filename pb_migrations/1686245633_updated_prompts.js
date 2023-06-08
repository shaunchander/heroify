migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g4lqzyz3gmymelv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t0ue12ks",
    "name": "inferenceId",
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

  // remove
  collection.schema.removeField("t0ue12ks")

  return dao.saveCollection(collection)
})
