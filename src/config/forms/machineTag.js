module.exports = {
    name: "machineTag",
    updatable: false,
    schema: [
      {
        field: "name",
        type: "text",
        editable: true
      },
      {
        field: "namespace",
        type: "text",
        editable: true
      },
      {
        field: "value",
        type: "text",
        editable: true
      },
    ]
  }