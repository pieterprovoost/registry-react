module.exports = {
    name: "endpoint",
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