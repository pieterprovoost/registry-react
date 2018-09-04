module.exports = {
    name: "tag",
    updatable: false,
    isNestedProperty: true,
    schema: [
      {
        field: "content",
        type: "text",
        multiline: true,
        editable: true
      },
    ]
  }