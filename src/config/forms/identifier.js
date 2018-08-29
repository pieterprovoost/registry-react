module.exports = {
    name: "identifier",
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