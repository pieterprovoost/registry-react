module.exports = {
    name: "identifier",
    updatable: false,
    isNestedProperty: true,
    schema: [
      {
        field: "identifier",
        type: "text",
        editable: true,
      },
      {
        field: "type",
        type: "enum",
        name: "IdentifierType",
        editable: true
      }
    ]
  }