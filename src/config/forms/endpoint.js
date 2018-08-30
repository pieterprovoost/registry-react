module.exports = {
    name: "endpoint",
    updatable: false,
    schema: [
      {
        field: "type",
        type: "enum",
        name: "EndpointType",
        editable: true
      },
      {
        field: "url",
        type: "text",
        editable: true
      },
      {
        field: "description",
        type: "text",
        multiline: true,
        editable: true
      },
    ]
  }