migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g4lqzyz3gmymelv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e0siwfwk",
    "name": "removeBgStatus",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g4lqzyz3gmymelv")

  // remove
  collection.schema.removeField("e0siwfwk")

  return dao.saveCollection(collection)
})
